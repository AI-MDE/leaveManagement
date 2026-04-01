'use strict';

/**
 * exportDocs.js
 * Exports all viewer documents to MkDocs or Confluence.
 *
 * Reads the running viewer (config.export.viewerUrl) to:
 *   - Fetch the full document tree  (/api/tree)
 *   - Fetch the document catalog    (/api/catalog)  — templateRef per docType
 *   - Fetch each document's content (/api/doc/{file})
 *   - Fetch Mustache templates       (/api/template/{name})
 *   - Render JSON docs through their templates → Markdown
 *   - Copy screenshots to assets/
 *
 * MkDocs  : writes output/export/mkdocs/docs/**\/*.md + mkdocs.yml
 * Confluence: POSTs each page via REST API (requires config.export.confluence)
 *
 * Usage:
 *   node scripts/exportDocs.js [--target=mkdocs|confluence]
 *
 * Requires:
 *   npm install (mustache + marked added to devDependencies)
 *
 * The viewer must be running:
 *   ts-node /dev/ai-mde/web/viewer.ts --root=.
 */

const fs       = require('fs');
const path     = require('path');
const https    = require('https');
const http     = require('http');
const Mustache = require('mustache');
const { marked } = require('marked');

const ROOT   = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'configuration.json'), 'utf8'));

const target     = (process.argv.find(a => a.startsWith('--target=')) || '--target=mkdocs').replace('--target=', '');
const viewerUrl  = config.export?.viewerUrl || 'http://localhost:4000';
const exportCfg  = config.export || {};

// Sections to exclude from exported documentation trees.
const EXCLUDED_SECTION_IDS = new Set([
  'mde-framework',
  'project-initiation',
]);

// ── HTTP helpers ─────────────────────────────────────────────────────────────

function get(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        if (res.statusCode >= 400) return reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        resolve(body);
      });
    }).on('error', reject);
  });
}

async function fetchJson(path_) {
  return JSON.parse(await get(`${viewerUrl}${path_}`));
}

async function fetchText(path_) {
  return get(`${viewerUrl}${path_}`);
}

// ── Slug / path helpers ───────────────────────────────────────────────────────

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function docFilename(doc) {
  if (doc.file) return slugify(path.basename(doc.file, path.extname(doc.file))) + '.md';
  return slugify(doc.label) + '.md';
}

// ── Template cache ────────────────────────────────────────────────────────────

const templateCache = {};
async function getTemplate(name) {
  if (!templateCache[name]) {
    templateCache[name] = await fetchText(`/api/template/${encodeURIComponent(name)}`);
  }
  return templateCache[name];
}

// ── Data normalizers (ported from viewer-client.js normalizeForTemplate) ─────

function normalizeForExport(docType, data) {
  if (docType === 'business-functions') {
    return {
      title: data.application || 'Business Functions',
      items: (data.capabilities || []).map(cap => ({
        id: cap.id, name: cap.name, description: cap.description || '',
        children: (cap.functions || []).map(fn => ({
          id: fn.id, name: fn.name, parentId: fn.parent_id || '',
          outcomes: fn.outcomes || [],
        })),
      })),
    };
  }

  if (docType === 'ui-module-spec') {
    const subNavItems = data.subNav || [];
    return {
      ...data,
      users:    (data.primaryUsers   || []).join(', '),
      backends: (data.backendModules || []).join(', '),
      hasSubNav: subNavItems.length > 0,
      subNav:    subNavItems.length > 0 ? subNavItems : null,
      pages: (data.pages || []).map(p => ({
        ...p,
        roles:            (p.requiredRoles   || []).join(', '),
        requirements:     (p.requirementRefs || []).join(', '),
        menuVisibleLabel: p.menuVisible === false ? 'flow only' : 'menu',
        hasActions:    (p.actions     || []).length > 0,
        hasFilters:    (p.filters     || []).length > 0,
        hasValidation: (p.validation  || []).length > 0,
      })),
    };
  }

  if (docType === 'orchestrator') {
    const phaseRules = data.phase_rules || {};
    return {
      ...data,
      phase_rules_list: Object.entries(phaseRules).map(([phase, rules]) => ({
        phase,
        allowed_commands: (rules.allowed_commands || []).join(', '),
        exit_conditions:  rules.exit_conditions_all || [],
      })),
    };
  }

  if (docType === 'methodology') {
    const phases = data.phases || [];
    return {
      ...data,
      phases: phases.map(p => ({ ...p, docs: p.docs || [] })),
    };
  }

  if (docType === 'mde-command') {
    const flatten = obj => obj && typeof obj === 'object'
      ? Object.entries(obj).map(([key, val]) => ({
          key, value: typeof val === 'object' ? (val.from || val.default || JSON.stringify(val)) : String(val),
        })) : [];
    return { ...data, calls: (data.calls || []).join(', '), requires_list: flatten(data.requires), produces_list: flatten(data.produces) };
  }

  if (docType === 'mde-skill') {
    const flatten = obj => obj && typeof obj === 'object'
      ? Object.entries(obj).map(([key, val]) => ({
          key, value: typeof val === 'object' ? (val.from || val.default || JSON.stringify(val)) : String(val),
        })) : [];
    return { ...data, inputs_list: flatten(data.inputs), outputs_list: flatten(data.outputs) };
  }

  // All other types: pass through — template handles it
  return data;
}

function renderEntityMarkdown(raw) {
  const e = raw?.entity || raw || {};
  const attrs = e.attributes || e.fields || [];
  const rels = e.relationships || [];
  const rules = e.business_rules || e.rules || [];
  const refs = e.source_refs || [];

  const lines = [];
  lines.push(`# ${e.name || e.id || 'Entity'}`);
  lines.push('');
  if (e.id) lines.push(`- **ID:** ${e.id}`);
  if (e.description) lines.push(`- **Description:** ${e.description}`);
  if (e.actor_ref) lines.push(`- **Actor Ref:** ${e.actor_ref}`);
  if (lines[lines.length - 1] !== '') lines.push('');

  if (attrs.length) {
    lines.push('## Attributes');
    lines.push('');
    lines.push('| Name | Type | Constraints | Notes |');
    lines.push('|---|---|---|---|');
    for (const a of attrs) {
      const constraints = Array.isArray(a.constraints) ? a.constraints.join(', ') : '';
      const notes = [a.note, a.description, Array.isArray(a.values) ? `values: ${a.values.join(', ')}` : '']
        .filter(Boolean)
        .join(' · ');
      lines.push(`| ${a.name || ''} | ${a.type || ''} | ${constraints} | ${notes} |`);
    }
    lines.push('');
  }

  if (rels.length) {
    lines.push('## Relationships');
    lines.push('');
    lines.push('| Type | Target | Cardinality | Description |');
    lines.push('|---|---|---|---|');
    for (const r of rels) {
      lines.push(`| ${r.type || ''} | ${r.target || r.entity || ''} | ${r.cardinality || ''} | ${r.description || ''} |`);
    }
    lines.push('');
  }

  if (rules.length) {
    lines.push('## Business Rules');
    lines.push('');
    for (const r of rules) lines.push(`- ${r}`);
    lines.push('');
  }

  if (refs.length) {
    lines.push('## Source Refs');
    lines.push('');
    lines.push(refs.map(r => `\`${r}\``).join(', '));
    lines.push('');
  }

  return lines.join('\n');
}

// ── Skip list — doc types that don't export well ──────────────────────────────

const SKIP_TYPES = new Set(['source-code', 'ui-source-code', 'sql', 'schema-state', 'sample-data']);

// ── Render a single doc → Markdown string ────────────────────────────────────

async function renderDoc(doc, catalogByType) {
  if (!doc.file) return null;                      // virtual doc
  if (SKIP_TYPES.has(doc.docType)) return null;    // skip code/data files

  let content, ext;
  try {
    const res = await fetchJson(`/api/doc/${encodeURIComponent(doc.file)}`);
    content = res.content;
    ext     = res.ext || path.extname(doc.file).slice(1);
  } catch (err) {
    return `# ${doc.label}\n\n_Could not load: ${err.message}_\n`;
  }

  // Already markdown
  if (ext === 'md') return content;

  if (doc.docType === 'entity' && ext === 'json') {
    try {
      return renderEntityMarkdown(JSON.parse(content));
    } catch {
      // fall through to default handling
    }
  }

  // JSON doc with a templateRef
  const catalogEntry = catalogByType[doc.docType];
  if (catalogEntry?.templateRef && ext === 'json') {
    try {
      const template = await getTemplate(catalogEntry.templateRef);
      const raw      = JSON.parse(content);
      const data     = normalizeForExport(doc.docType, raw);
      return Mustache.render(template, data);
    } catch (err) {
      // Fall through to raw JSON block
    }
  }

  // Fallback: fenced JSON code block
  return `# ${doc.label}\n\n\`\`\`json\n${content}\n\`\`\`\n`;
}

// ── Walk the tree → flat list of { sectionLabel, sectionSlug, groupSlug, doc } ─

function walkTree(tree) {
  const result = [];
  for (const section of tree) {
    const secSlug = slugify(section.label);
    for (const doc of (section.docs || [])) {
      result.push({ sectionLabel: section.label, sectionSlug: secSlug, groupSlug: null, doc });
    }
    for (const group of (section.groups || [])) {
      const grpSlug = slugify(group.label);
      collectGroup(group, section.label, secSlug, grpSlug, result);
    }
  }
  return result;
}

function collectGroup(group, sectionLabel, secSlug, groupSlug, result) {
  for (const doc of (group.docs || [])) {
    result.push({ sectionLabel, sectionSlug: secSlug, groupSlug, doc });
  }
  for (const sub of (group.groups || [])) {
    collectGroup(sub, sectionLabel, secSlug, `${groupSlug}/${slugify(sub.label)}`, result);
  }
}

function filterTreeForExport(tree) {
  return (tree || []).filter(section => !EXCLUDED_SECTION_IDS.has(section.id));
}

function listScreenshotFiles(dirs) {
  const supported = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
  const files = [];
  const seen = new Set();

  for (const dir of dirs) {
    if (!dir || !fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      const ext = path.extname(name).toLowerCase();
      if (!supported.has(ext)) continue;
      if (seen.has(name)) continue;
      seen.add(name);
      files.push({ name, abs: path.join(dir, name) });
    }
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

// ── MkDocs export ─────────────────────────────────────────────────────────────

async function exportMkDocs(tree, catalogByType) {
  const filteredTree = filterTreeForExport(tree);
  const mkdocsCfg = exportCfg.mkdocs || {};
  const siteName  = mkdocsCfg.siteName || config.project?.name || 'Documentation';
  const docsDir   = path.resolve(ROOT, mkdocsCfg.docsDir || 'output/export/mkdocs/docs');
  const ymlPath   = path.resolve(ROOT, mkdocsCfg.ymlPath || 'output/export/mkdocs/mkdocs.yml');

  fs.mkdirSync(docsDir, { recursive: true });

  // Write index.md (dashboard summary)
  fs.writeFileSync(
    path.join(docsDir, 'index.md'),
    `# ${siteName}\n\nGenerated by MDE Documentation Export on ${new Date().toISOString().slice(0,10)}.\n`
  );

  const entries = walkTree(filteredTree);

  // nav structure: { sectionLabel → { groupLabel → [{ label, file }] } }
  const navSections = {};
  let done = 0, skipped = 0;

  for (const { sectionLabel, sectionSlug, groupSlug, doc } of entries) {
    const md = await renderDoc(doc, catalogByType);
    if (!md) { skipped++; continue; }

    const folder  = groupSlug ? path.join(docsDir, sectionSlug, groupSlug) : path.join(docsDir, sectionSlug);
    const relFile = groupSlug
      ? `${sectionSlug}/${groupSlug}/${docFilename(doc)}`
      : `${sectionSlug}/${docFilename(doc)}`;

    fs.mkdirSync(folder, { recursive: true });
    fs.writeFileSync(path.join(docsDir, relFile), md, 'utf8');
    done++;

    // Build nav
    if (!navSections[sectionLabel]) navSections[sectionLabel] = {};
    const grpKey = groupSlug || '__root__';
    if (!navSections[sectionLabel][grpKey]) navSections[sectionLabel][grpKey] = [];
    navSections[sectionLabel][grpKey].push({ label: doc.label, file: relFile });

    console.log(`[ok]   ${doc.label.padEnd(45)} → ${relFile}`);
  }

  // Copy screenshots + generate gallery page
  const screensDir = path.resolve(ROOT, exportCfg.screenshots?.outputDir || config.screenshots?.outputDir || 'output/screenshots');
  const screensFallbackDir = path.resolve(ROOT, 'docs/screens');
  const assetsDir  = path.join(docsDir, 'assets', 'screenshots');
  const shotFiles = listScreenshotFiles([screensDir, screensFallbackDir]);
  if (shotFiles.length) {
    fs.mkdirSync(assetsDir, { recursive: true });
    for (const shot of shotFiles) {
      fs.copyFileSync(shot.abs, path.join(assetsDir, shot.name));
    }
    console.log(`[ok]   Screenshots copied to assets/screenshots/ (${shotFiles.length})`);

    const screenshotsPage = [
      '# Screenshots',
      '',
      'Generated screenshot gallery.',
      '',
      ...shotFiles.flatMap(shot => [
        `## ${shot.name}`,
        '',
        `![${shot.name}](assets/screenshots/${shot.name})`,
        '',
      ]),
    ].join('\n');
    fs.writeFileSync(path.join(docsDir, 'screenshots.md'), screenshotsPage, 'utf8');
    console.log('[ok]   Screenshot gallery page -> screenshots.md');
  }

  // Ensure mermaid initializer exists for MkDocs Material runtime rendering.
  const mermaidInitRel = 'javascripts/mermaid-init.js';
  const mermaidInitAbs = path.join(docsDir, mermaidInitRel);
  fs.mkdirSync(path.dirname(mermaidInitAbs), { recursive: true });
  fs.writeFileSync(
    mermaidInitAbs,
    [
      'window.mermaidConfig = { startOnLoad: false };',
      '',
      'function renderMermaid() {',
      "  if (typeof mermaid === 'undefined') return;",
      '  mermaid.initialize(window.mermaidConfig);',
      "  const blocks = document.querySelectorAll('pre code.language-mermaid');",
      '  blocks.forEach((codeEl, idx) => {',
      "    const pre = codeEl.closest('pre');",
      '    if (!pre) return;',
      "    const source = codeEl.textContent || '';",
      "    const div = document.createElement('div');",
      "    div.className = 'mermaid';",
      "    div.id = `mermaid-${idx}-${Date.now()}`;",
      "    div.textContent = source;",
      '    pre.replaceWith(div);',
      '  });',
      "  mermaid.run({ querySelector: '.mermaid' });",
      '}',
      '',
      "if (typeof document$ !== 'undefined' && document$.subscribe) {",
      '  document$.subscribe(() => renderMermaid());',
      '} else {',
      "  document.addEventListener('DOMContentLoaded', renderMermaid);",
      '}',
      '',
    ].join('\n'),
    'utf8'
  );

  // Generate mkdocs.yml
  const navYaml = buildMkDocsNav(navSections);
  const yml = [
    `site_name: ${siteName}`,
    `docs_dir: docs`,
    `theme:`,
    `  name: ${mkdocsCfg.theme || 'material'}`,
    `markdown_extensions:`,
    `  - admonition`,
    `  - pymdownx.superfences:`,
    `      custom_fences:`,
    `        - name: mermaid`,
    `          class: mermaid`,
    `          format: !!python/name:pymdownx.superfences.fence_code_format`,
    `extra_javascript:`,
    `  - https://unpkg.com/mermaid@10/dist/mermaid.min.js`,
    `  - ${mermaidInitRel}`,
    `nav:`,
    `  - Home: index.md`,
    ...(shotFiles.length ? [`  - Screenshots: screenshots.md`] : []),
    ...navYaml,
  ].join('\n');

  fs.mkdirSync(path.dirname(ymlPath), { recursive: true });
  fs.writeFileSync(ymlPath, yml, 'utf8');

  console.log(`\n─────────────────────────────────────────────────`);
  console.log(`MkDocs export done: ${done} pages, ${skipped} skipped`);
  console.log(`Docs dir:  ${docsDir}`);
  console.log(`Config:    ${ymlPath}`);
  console.log(`\nTo serve:  cd ${path.dirname(ymlPath)} && mkdocs serve`);
  console.log(`To build:  cd ${path.dirname(ymlPath)} && mkdocs build`);
}

function buildMkDocsNav(navSections) {
  const y = (label) => JSON.stringify(String(label));
  const lines = [];
  for (const [section, groups] of Object.entries(navSections)) {
    const rootDocs = groups['__root__'] || [];
    const subGroups = Object.entries(groups).filter(([k]) => k !== '__root__');

    if (!subGroups.length && rootDocs.length === 1) {
      lines.push(`  - ${y(section)}: ${rootDocs[0].file}`);
    } else {
      lines.push(`  - ${y(section)}:`);
      for (const { label, file } of rootDocs) {
        lines.push(`    - ${y(label)}: ${file}`);
      }
      for (const [grpSlug, docs] of subGroups) {
        const grpLabel = grpSlug.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        lines.push(`    - ${y(grpLabel)}:`);
        for (const { label, file } of docs) {
          lines.push(`      - ${y(label)}: ${file}`);
        }
      }
    }
  }
  return lines;
}

// ── Confluence export ─────────────────────────────────────────────────────────

async function exportConfluence(tree, catalogByType) {
  const filteredTree = filterTreeForExport(tree);
  const conf = exportCfg.confluence || {};
  if (!conf.baseUrl || !conf.spaceKey || !conf.email || !conf.apiToken) {
    console.error('Confluence export requires config.export.confluence: baseUrl, spaceKey, email, apiToken');
    process.exit(1);
  }

  const auth    = Buffer.from(`${conf.email}:${conf.apiToken}`).toString('base64');
  const entries = walkTree(filteredTree);
  let done = 0, skipped = 0;

  // Create or find a root page for this export
  const rootPageId = conf.parentPageId || await confluenceCreatePage(
    conf, auth, null,
    config.project?.name || 'MDE Documentation',
    `<p>Generated by MDE Documentation Export on ${new Date().toISOString().slice(0,10)}.</p>`
  );

  // Track section pages
  const sectionPageIds = {};

  for (const { sectionLabel, sectionSlug, groupSlug, doc } of entries) {
    const md = await renderDoc(doc, catalogByType);
    if (!md) { skipped++; continue; }

    // Ensure section page exists
    if (!sectionPageIds[sectionSlug]) {
      sectionPageIds[sectionSlug] = await confluenceCreatePage(
        conf, auth, rootPageId, sectionLabel,
        `<p>${sectionLabel}</p>`
      );
    }

    const parentId = sectionPageIds[sectionSlug];
    const html     = marked(md);

    await confluenceCreatePage(conf, auth, parentId, doc.label, html);
    done++;
    console.log(`[ok]   ${doc.label}`);
  }

  console.log(`\n─────────────────────────────────────────────────`);
  console.log(`Confluence export done: ${done} pages, ${skipped} skipped`);
  console.log(`Space: ${conf.spaceKey}  Root page ID: ${rootPageId}`);
}

function confluenceCreatePage(conf, auth, parentId, title, htmlBody) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      type:  'page',
      title,
      space: { key: conf.spaceKey },
      ...(parentId ? { ancestors: [{ id: parentId }] } : {}),
      body: { storage: { value: htmlBody, representation: 'storage' } },
    });
    const url  = new URL(`${conf.baseUrl}/rest/api/content`);
    const opts = {
      hostname: url.hostname,
      port:     url.port || (url.protocol === 'https:' ? 443 : 80),
      path:     url.pathname,
      method:   'POST',
      headers:  {
        'Content-Type':  'application/json',
        'Authorization': `Basic ${auth}`,
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const mod = url.protocol === 'https:' ? https : http;
    const req = mod.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.id) resolve(json.id);
          else reject(new Error(`Confluence error: ${data}`));
        } catch { reject(new Error(data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Export target: ${target}`);
  console.log(`Viewer:        ${viewerUrl}\n`);

  // Fetch tree and catalog from viewer
  let tree, catalogData;
  try {
    [tree, catalogData] = await Promise.all([
      fetchJson('/api/tree'),
      fetchJson('/api/catalog'),
    ]);
  } catch (err) {
    console.error(`Cannot reach viewer at ${viewerUrl} — is it running?\n${err.message}`);
    process.exit(1);
  }

  // Build docType → catalog entry map
  const catalogByType = {};
  for (const dt of (catalogData.document_types || [])) {
    catalogByType[dt.id] = dt;
  }

  if (target === 'mkdocs')      await exportMkDocs(tree, catalogByType);
  else if (target === 'confluence') await exportConfluence(tree, catalogByType);
  else { console.error(`Unknown target: ${target}. Use --target=mkdocs or --target=confluence`); process.exit(1); }
}

main().catch(err => { console.error(err); process.exit(1); });
