# screenshot_generation

Generate a Playwright-based screenshot script for all app pages defined in the UI module specs. Patches configuration.json with a screenshots section and package.json with the required script entry and devDependency.

## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **sampleData** | `output&#x2F;sample-data&#x2F;` |
| **packageJson** | `package.json` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **sampleData** | `output&#x2F;sample-data&#x2F;` |
| **packageJson** | `package.json` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **sampleData** | `output&#x2F;sample-data&#x2F;` |
| **packageJson** | `package.json` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **sampleData** | `output&#x2F;sample-data&#x2F;` |
| **packageJson** | `package.json` |

## Outputs

| Key | Path |
|---|---|
| **screenshotScript** | `scripts&#x2F;takeScreenshots.js` |

## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
## Rules

- CRITICAL: The script must be pure CommonJS (require&#x2F;module.exports) — no import&#x2F;export syntax, no TypeScript.
- CRITICAL: Use the glob npm package (v10 sync API or glob.sync) to resolve uiModulePattern — do not use fs.readdirSync manually.
- CRITICAL: Login once per run using a shared browser context — do NOT open a new context per page.
- CRITICAL: screenshots.sampleIds keys must exactly match page.id values from the UI module spec (e.g. &#39;&#x2F;my-leave&#x2F;requests&#x2F;:id&#39;), not router path strings.
- CRITICAL: Patch package.json by reading and merging — do NOT overwrite the entire file.
- CRITICAL: Patch configuration.json by reading and merging the screenshots section — do NOT overwrite existing keys.
- Generate the script so it is runnable immediately after npm install — no compilation required.
- outputDir from configuration.json is relative to project root — resolve it with path.resolve(ROOT, outputDir) in the script.
- The script must create outputDir recursively with fs.mkdirSync if it does not exist.
- Print per-page [ok] &#x2F; [fail] &#x2F; [skip] lines to stdout for visibility during CI runs.
- Do not hardcode any URLs, credentials, or IDs in the script — all values must come from configuration.json or environment variable overrides.
