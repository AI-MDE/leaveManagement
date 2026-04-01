# Generate Screenshot Script

| | |
|---|---|
| **Name** | `generate_screenshots` |
| **Phase** | testing |
| **Intent** | generate |
| **Calls** | screenshot_generation |

## Rules

- Add screenshots section to configuration.json if absent
- Patch package.json to add test:screenshots script and @playwright&#x2F;test devDependency
- Generate scripts&#x2F;takeScreenshots.js — must be runnable with node, no build step required
- Derive sampleIds from files in output&#x2F;sample-data&#x2F; — read the first id from each JSON array
- Map each parameterized route pattern (containing :id) to the appropriate sample entity ID
## Rules

- Add screenshots section to configuration.json if absent
- Patch package.json to add test:screenshots script and @playwright&#x2F;test devDependency
- Generate scripts&#x2F;takeScreenshots.js — must be runnable with node, no build step required
- Derive sampleIds from files in output&#x2F;sample-data&#x2F; — read the first id from each JSON array
- Map each parameterized route pattern (containing :id) to the appropriate sample entity ID
## Rules

- Add screenshots section to configuration.json if absent
- Patch package.json to add test:screenshots script and @playwright&#x2F;test devDependency
- Generate scripts&#x2F;takeScreenshots.js — must be runnable with node, no build step required
- Derive sampleIds from files in output&#x2F;sample-data&#x2F; — read the first id from each JSON array
- Map each parameterized route pattern (containing :id) to the appropriate sample entity ID
## Rules

- Add screenshots section to configuration.json if absent
- Patch package.json to add test:screenshots script and @playwright&#x2F;test devDependency
- Generate scripts&#x2F;takeScreenshots.js — must be runnable with node, no build step required
- Derive sampleIds from files in output&#x2F;sample-data&#x2F; — read the first id from each JSON array
- Map each parameterized route pattern (containing :id) to the appropriate sample entity ID
## Rules

- Add screenshots section to configuration.json if absent
- Patch package.json to add test:screenshots script and @playwright&#x2F;test devDependency
- Generate scripts&#x2F;takeScreenshots.js — must be runnable with node, no build step required
- Derive sampleIds from files in output&#x2F;sample-data&#x2F; — read the first id from each JSON array
- Map each parameterized route pattern (containing :id) to the appropriate sample entity ID

## Requires

- **config** — `configuration.json`
- **uiModuleSpecs** — `config.design.uiModules`
- **uiCatalog** — `config.design.uiModules`
- **sampleData** — `output&#x2F;sample-data`
- **packageJson** — `package.json`
## Requires

- **config** — `configuration.json`
- **uiModuleSpecs** — `config.design.uiModules`
- **uiCatalog** — `config.design.uiModules`
- **sampleData** — `output&#x2F;sample-data`
- **packageJson** — `package.json`
## Requires

- **config** — `configuration.json`
- **uiModuleSpecs** — `config.design.uiModules`
- **uiCatalog** — `config.design.uiModules`
- **sampleData** — `output&#x2F;sample-data`
- **packageJson** — `package.json`
## Requires

- **config** — `configuration.json`
- **uiModuleSpecs** — `config.design.uiModules`
- **uiCatalog** — `config.design.uiModules`
- **sampleData** — `output&#x2F;sample-data`
- **packageJson** — `package.json`
## Requires

- **config** — `configuration.json`
- **uiModuleSpecs** — `config.design.uiModules`
- **uiCatalog** — `config.design.uiModules`
- **sampleData** — `output&#x2F;sample-data`
- **packageJson** — `package.json`

## Produces

- **screenshotScript** — `scripts&#x2F;takeScreenshots.js`
- **screenshots** — `output&#x2F;screenshots`
## Produces

- **screenshotScript** — `scripts&#x2F;takeScreenshots.js`
- **screenshots** — `output&#x2F;screenshots`
