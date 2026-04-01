# Generate Modules

| | |
|---|---|
| **Name** | `generate_modules` |
| **Phase** | system_design |
| **Intent** | generate |
| **Calls** | module_definition |

## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit
## Rules

- Step 1 — Build or refresh module-catalog.json from entity files and nonEntityModules in application_architecture.json
- Step 2 — For every module in the catalog, produce one JSON + one MD module definition
- Entity-driven modules: one module per ent-*.json file
- Non-entity modules: one module per entry in application_architecture.json nonEntityModules
- Read each entityRef file for fields, rules, stateMachine — do not re-derive
- Apply module_type_rules from architecture.json to set generates[], required spec sections, domain artifacts
- No overlapping responsibilities; dependencies must be explicit and directional
- No new requirements — all content traceable to inputs
- All state transitions and error conditions must be explicit

## Requires

- **entities** — `config.design.entityPattern`
- **appArchitecture** — `config.design.appArchitecture`
- **requirements** — `config.ba.requirements`
- **architecture** — `config.mde.architecture`
## Requires

- **entities** — `config.design.entityPattern`
- **appArchitecture** — `config.design.appArchitecture`
- **requirements** — `config.ba.requirements`
- **architecture** — `config.mde.architecture`
## Requires

- **entities** — `config.design.entityPattern`
- **appArchitecture** — `config.design.appArchitecture`
- **requirements** — `config.ba.requirements`
- **architecture** — `config.mde.architecture`
## Requires

- **entities** — `config.design.entityPattern`
- **appArchitecture** — `config.design.appArchitecture`
- **requirements** — `config.ba.requirements`
- **architecture** — `config.mde.architecture`

## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
## Produces

- **moduleCatalog** — `config.design.moduleCatalog`
- **moduleJson** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.json&quot;}`
- **moduleMd** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;{moduleType}&#x2F;module-{kebab-module}.md&quot;}`
