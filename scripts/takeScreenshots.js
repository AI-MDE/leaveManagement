'use strict';

/**
 * takeScreenshots.js
 * Captures full-page screenshots of all app pages defined in the UI module specs.
 *
 * Pages and output directory are driven by configuration.json:
 *   screenshots.uiModulePattern — glob pattern for UI module spec files
 *   screenshots.outputDir       — directory where PNGs are saved (relative to project root)
 *   screenshots.auth            — login credentials (email + password)
 *   screenshots.sampleIds       — map of parameterized route patterns to sample IDs
 *
 * Usage:
 *   node scripts/takeScreenshots.js
 *
 * Requires:
 *   npm install
 *   npx playwright install chromium
 *
 * The app must be running before executing this script:
 *   npm run dev:all
 *
 * Environment variable overrides:
 *   SCREENSHOT_URL      — override ui.devUrl (e.g. http://localhost:5173)
 *   SCREENSHOT_EMAIL    — override screenshots.auth.email
 *   SCREENSHOT_PASSWORD — override screenshots.auth.password
 */

const fs   = require('fs');
const path = require('path');

const ROOT   = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'configuration.json'), 'utf8'));

const { outputDir, uiModulePattern, auth, sampleIds = {} } = config.screenshots;

const baseUrl  = process.env.SCREENSHOT_URL      || config.ui.devUrl;
const email    = process.env.SCREENSHOT_EMAIL    || auth.email;
const password = process.env.SCREENSHOT_PASSWORD || auth.password;

const absOutput = path.resolve(ROOT, outputDir);

// ── Collect pages from all UI module specs ───────────────────────────────────

function collectPages() {
  // Resolve the ui module directory from the pattern (e.g. "design/modules/ui/ui-*.json")
  const patternParts = uiModulePattern.split('/');
  const uiDir        = path.resolve(ROOT, patternParts.slice(0, -1).join('/'));

  if (!fs.existsSync(uiDir)) {
    console.error(`UI module directory not found: ${uiDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(uiDir)
    .filter(f => /^ui-.+\.json$/.test(f) && f !== 'ui-catalog.json')
    .map(f => path.join(uiDir, f));

  if (!files.length) {
    console.error(`No UI module spec files found in: ${uiDir}`);
    process.exit(1);
  }

  const pages = [];

  for (const file of files) {
    const spec = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const page of spec.pages || []) {
      const pageId = page.id; // e.g. "/my-leave/requests/:id"

      let resolvedPath = pageId;
      if (/:/.test(pageId)) {
        const sampleId = sampleIds[pageId];
        if (!sampleId) {
          console.warn(`[skip] No sampleId for "${pageId}" — add it to screenshots.sampleIds in configuration.json`);
          continue;
        }
        resolvedPath = pageId.replace(/:([^/]+)/g, () => sampleId);
      }

      pages.push({
        id:       pageId,
        name:     page.name,
        module:   spec.moduleName || spec.moduleId,
        url:      `${baseUrl}${resolvedPath}`,
        filename: pageId
          .replace(/^\//, '')
          .replace(/[/:]/g, '-')
          .replace(/-+/g, '-')
          .replace(/-$/, '')
          + '.png',
      });
    }
  }

  return pages;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const pages = collectPages();

  if (!pages.length) {
    console.error('No pages found. Check screenshots.uiModulePattern and screenshots.sampleIds in configuration.json.');
    process.exit(1);
  }

  console.log(`Found ${pages.length} pages.`);
  console.log(`Output: ${absOutput}\n`);

  fs.mkdirSync(absOutput, { recursive: true });

  const { chromium } = require('@playwright/test');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page    = await context.newPage();

  // Login once — reuse the authenticated session for all pages
  console.log(`Logging in as ${email} at ${baseUrl}/login …`);
  try {
    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle', timeout: 15000 });
    await page.fill('input[type="email"]',    email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 10000 });
  } catch (err) {
    console.error(`Login failed — is the app running at ${baseUrl}?\n${err.message}`);
    await browser.close();
    process.exit(1);
  }
  console.log('Logged in.\n');

  let done = 0, failed = 0;

  for (const appPage of pages) {
    try {
      await page.goto(appPage.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(800);
      const buffer = await page.screenshot({ fullPage: true });
      const dest   = path.join(absOutput, appPage.filename);
      fs.writeFileSync(dest, buffer);
      done++;
      console.log(`[ok]   ${appPage.name.padEnd(45)} → ${appPage.filename}`);
    } catch (err) {
      failed++;
      console.error(`[fail] ${appPage.name}: ${err.message}`);
    }
  }

  await context.close();
  await browser.close();

  console.log(`\n─────────────────────────────────────────────────`);
  console.log(`Done: ${done} captured, ${failed} failed`);
  console.log(`Saved to: ${absOutput}`);

  if (failed > 0) process.exit(1);
}

main().catch(err => { console.error(err); process.exit(1); });
