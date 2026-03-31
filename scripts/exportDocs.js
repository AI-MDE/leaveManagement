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

// ── MkDocs export ─────────────────────────────────────────────────────────────

async function exportMkDocs(tree, catalogByType) {
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

  const entries = walkTree(tree);

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

  // Copy screenshots
  const screensDir = path.resolve(ROOT, exportCfg.screenshots?.outputDir || config.screenshots?.outputDir || 'output/screenshots');
  const assetsDir  = path.join(docsDir, 'assets', 'screenshots');
  if (fs.existsSync(screensDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
    for (const f of fs.readdirSync(screensDir).filter(f => f.endsWith('.png'))) {
      fs.copyFileSync(path.join(screensDir, f), path.join(assetsDir, f));
    }
    console.log(`[ok]   Screenshots copied → assets/screenshots/`);
  }

  // Generate mkdocs.yml
  const navYaml = buildMkDocsNav(navSections);
  const yml = [
    `site_name: ${siteName}`,
    `docs_dir: docs`,
    `theme:`,
    `  name: ${mkdocsCfg.theme || 'material'}`,
    `nav:`,
    `  - Home: index.md`,
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
  const lines = [];
  for (const [section, groups] of Object.entries(navSections)) {
    const rootDocs = groups['__root__'] || [];
    const subGroups = Object.entries(groups).filter(([k]) => k !== '__root__');

    if (!subGroups.length && rootDocs.length === 1) {
      lines.push(`  - ${section}: ${rootDocs[0].file}`);
    } else {
      lines.push(`  - ${section}:`);
      for (const { label, file } of rootDocs) {
        lines.push(`    - ${label}: ${file}`);
      }
      for (const [grpSlug, docs] of subGroups) {
        const grpLabel = grpSlug.split('/').pop().replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        lines.push(`    - ${grpLabel}:`);
        for (const { label, file } of docs) {
          lines.push(`      - ${label}: ${file}`);
        }
      }
    }
  }
  return lines;
}

// ── Confluence export ─────────────────────────────────────────────────────────

async function exportConfluence(tree, catalogByType) {
  const conf = exportCfg.confluence || {};
  if (!conf.baseUrl || !conf.spaceKey || !conf.email || !conf.apiToken) {
    console.error('Confluence export requires config.export.confluence: baseUrl, spaceKey, email, apiToken');
    process.exit(1);
  }

  const auth    = Buffer.from(`${conf.email}:${conf.apiToken}`).toString('base64');
  const entries = walkTree(tree);
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
