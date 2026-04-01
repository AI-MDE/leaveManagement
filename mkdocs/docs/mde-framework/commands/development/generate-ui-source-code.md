# Generate UI Source Code

| | |
|---|---|
| **Name** | `generate_ui_source_code` |
| **Phase** | development |
| **Intent** | generate |
| **Calls** | ui_source_code_generation |

## Rules

- Generate one UI module folder per entry in ui-catalog.json
- Each page in a UI module spec becomes one component file
- Follow framework and styling choices from config.ui
## Rules

- Generate one UI module folder per entry in ui-catalog.json
- Each page in a UI module spec becomes one component file
- Follow framework and styling choices from config.ui
## Rules

- Generate one UI module folder per entry in ui-catalog.json
- Each page in a UI module spec becomes one component file
- Follow framework and styling choices from config.ui

## Requires

- **uiCatalog** — `config.design.uiModules`
- **uiModuleSpecs** — `config.design.uiModules`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
- **application** — `config.application.definition`
## Requires

- **uiCatalog** — `config.design.uiModules`
- **uiModuleSpecs** — `config.design.uiModules`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
- **application** — `config.application.definition`
## Requires

- **uiCatalog** — `config.design.uiModules`
- **uiModuleSpecs** — `config.design.uiModules`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
- **application** — `config.application.definition`
## Requires

- **uiCatalog** — `config.design.uiModules`
- **uiModuleSpecs** — `config.design.uiModules`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
- **application** — `config.application.definition`
## Requires

- **uiCatalog** — `config.design.uiModules`
- **uiModuleSpecs** — `config.design.uiModules`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
- **application** — `config.application.definition`

## Produces

- **uiSrc** — `{&quot;to&quot;:&quot;config.output.uiSrc&quot;,&quot;pattern&quot;:&quot;{module}&#x2F;**&#x2F;*.{tsx,ts,css}&quot;}`
