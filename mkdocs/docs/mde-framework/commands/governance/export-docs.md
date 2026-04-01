# Export Documentation

| | |
|---|---|
| **Name** | `export_docs` |
| **Phase** | governance |
| **Intent** | generate |
| **Calls** | docs_export |

## Rules

- Add export section to configuration.json if absent
- Generate scripts&#x2F;exportDocs.js — must be runnable with node, no build step
- Patch package.json to add export:mkdocs and export:confluence scripts
- Add mustache and marked to devDependencies in package.json
## Rules

- Add export section to configuration.json if absent
- Generate scripts&#x2F;exportDocs.js — must be runnable with node, no build step
- Patch package.json to add export:mkdocs and export:confluence scripts
- Add mustache and marked to devDependencies in package.json
## Rules

- Add export section to configuration.json if absent
- Generate scripts&#x2F;exportDocs.js — must be runnable with node, no build step
- Patch package.json to add export:mkdocs and export:confluence scripts
- Add mustache and marked to devDependencies in package.json
## Rules

- Add export section to configuration.json if absent
- Generate scripts&#x2F;exportDocs.js — must be runnable with node, no build step
- Patch package.json to add export:mkdocs and export:confluence scripts
- Add mustache and marked to devDependencies in package.json

## Requires

- **config** — `configuration.json`
- **viewer** — `{&quot;note&quot;:&quot;Viewer must be running at config.export.viewerUrl (default http:&#x2F;&#x2F;localhost:4000)&quot;}`
## Requires

- **config** — `configuration.json`
- **viewer** — `{&quot;note&quot;:&quot;Viewer must be running at config.export.viewerUrl (default http:&#x2F;&#x2F;localhost:4000)&quot;}`

## Produces

- **mkdocs** — `output&#x2F;export&#x2F;mkdocs&#x2F;docs`
- **mkdocsYml** — `output&#x2F;export&#x2F;mkdocs&#x2F;mkdocs.yml`
## Produces

- **mkdocs** — `output&#x2F;export&#x2F;mkdocs&#x2F;docs`
- **mkdocsYml** — `output&#x2F;export&#x2F;mkdocs&#x2F;mkdocs.yml`
