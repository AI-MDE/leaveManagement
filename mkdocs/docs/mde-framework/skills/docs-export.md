# docs_export

Generate a standalone Node.js script (scripts&#x2F;exportDocs.js) that exports all viewer documents to MkDocs or Confluence. The script calls the running viewer&#39;s REST API to fetch the document tree, templates, and content — then renders each doc through its Mustache template and writes output files.

## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **viewerApi** | `{&quot;note&quot;:&quot;Live viewer REST API — must be running at config.export.viewerUrl&quot;,&quot;endpoints&quot;:{&quot;&#x2F;api&#x2F;tree&quot;:&quot;Full document tree (sections, groups, docs)&quot;,&quot;&#x2F;api&#x2F;catalog&quot;:&quot;document-catalog.json — docType → templateRef mapping&quot;,&quot;&#x2F;api&#x2F;doc&#x2F;{relPath}&quot;:&quot;Raw file content + extension&quot;,&quot;&#x2F;api&#x2F;template&#x2F;{name}&quot;:&quot;Mustache template source&quot;,&quot;&#x2F;api&#x2F;screenshots&quot;:&quot;List of screenshot PNG paths&quot;}}` |
| **packageJson** | `package.json` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **viewerApi** | `{&quot;note&quot;:&quot;Live viewer REST API — must be running at config.export.viewerUrl&quot;,&quot;endpoints&quot;:{&quot;&#x2F;api&#x2F;tree&quot;:&quot;Full document tree (sections, groups, docs)&quot;,&quot;&#x2F;api&#x2F;catalog&quot;:&quot;document-catalog.json — docType → templateRef mapping&quot;,&quot;&#x2F;api&#x2F;doc&#x2F;{relPath}&quot;:&quot;Raw file content + extension&quot;,&quot;&#x2F;api&#x2F;template&#x2F;{name}&quot;:&quot;Mustache template source&quot;,&quot;&#x2F;api&#x2F;screenshots&quot;:&quot;List of screenshot PNG paths&quot;}}` |
| **packageJson** | `package.json` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **viewerApi** | `{&quot;note&quot;:&quot;Live viewer REST API — must be running at config.export.viewerUrl&quot;,&quot;endpoints&quot;:{&quot;&#x2F;api&#x2F;tree&quot;:&quot;Full document tree (sections, groups, docs)&quot;,&quot;&#x2F;api&#x2F;catalog&quot;:&quot;document-catalog.json — docType → templateRef mapping&quot;,&quot;&#x2F;api&#x2F;doc&#x2F;{relPath}&quot;:&quot;Raw file content + extension&quot;,&quot;&#x2F;api&#x2F;template&#x2F;{name}&quot;:&quot;Mustache template source&quot;,&quot;&#x2F;api&#x2F;screenshots&quot;:&quot;List of screenshot PNG paths&quot;}}` |
| **packageJson** | `package.json` |

## Outputs

| Key | Path |
|---|---|
| **exportScript** | `{&quot;to&quot;:&quot;scripts&#x2F;exportDocs.js&quot;}` |

## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
## Rules

- CRITICAL: Script must be pure CommonJS — no import&#x2F;export, no TypeScript.
- CRITICAL: Use the viewer&#39;s &#x2F;api&#x2F;tree and &#x2F;api&#x2F;catalog to discover all docs — never hardcode paths.
- CRITICAL: Patch package.json by reading and merging — never overwrite.
- CRITICAL: Patch configuration.json by reading and merging — never overwrite existing keys.
- CRITICAL: Confluence auth credentials go in configuration.json with empty defaults — never hardcode tokens.
- Template rendering must use the mustache npm package (require(&#39;mustache&#39;)).
- Confluence HTML conversion must use the marked npm package (require(&#39;marked&#39;)).
- Screenshots are copied from config.screenshots.outputDir to docs&#x2F;assets&#x2F;screenshots&#x2F;.
- mkdocs.yml nav must mirror the tree hierarchy from &#x2F;api&#x2F;tree.
- Skipped doc types: source-code, ui-source-code, sql, schema-state, sample-data — these are too verbose for documentation.
