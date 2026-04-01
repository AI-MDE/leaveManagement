# Elaborate System Design

| | |
|---|---|
| **Name** | `elaborate_system_design` |
| **Phase** | system_design |
| **Intent** | generate |
| **Calls** | physical_entity_identification, system_design, module_definition, ui_module_definition, diagram_generation |

## Rules

- Execute skills in strict order above
- Fail fast on the first failed checkpoint; do not run downstream skills on invalid or partial upstream outputs
- Do not invent requirements; all outputs must be traceable to requirements, business functions, and use cases
- All generated JSON artifacts must pass schema&#x2F;structure validation before command completion
## Rules

- Execute skills in strict order above
- Fail fast on the first failed checkpoint; do not run downstream skills on invalid or partial upstream outputs
- Do not invent requirements; all outputs must be traceable to requirements, business functions, and use cases
- All generated JSON artifacts must pass schema&#x2F;structure validation before command completion
## Rules

- Execute skills in strict order above
- Fail fast on the first failed checkpoint; do not run downstream skills on invalid or partial upstream outputs
- Do not invent requirements; all outputs must be traceable to requirements, business functions, and use cases
- All generated JSON artifacts must pass schema&#x2F;structure validation before command completion
## Rules

- Execute skills in strict order above
- Fail fast on the first failed checkpoint; do not run downstream skills on invalid or partial upstream outputs
- Do not invent requirements; all outputs must be traceable to requirements, business functions, and use cases
- All generated JSON artifacts must pass schema&#x2F;structure validation before command completion

## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **ldm** — `config.ba.ldm`
- **architecture** — `config.mde.architecture`
- **appArchitecture** — `config.design.appArchitecture`

## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}`
