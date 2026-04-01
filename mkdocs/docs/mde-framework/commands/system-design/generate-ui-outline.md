# Generate UI Outline

| | |
|---|---|
| **Name** | `generate_ui_outline` |
| **Phase** | system_design |
| **Intent** | generate |
| **Calls** | ui_module_definition |

## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases
## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases
## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases
## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases
## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases
## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases
## Rules

- Step 1 — Identify UI modules: one per cohesive user workflow derived from use cases and business functions
- Step 2 — Write ui-catalog.json listing all UI modules with id, name, routePrefix, primaryUsers, backendModules, priority
- Step 3 — For each UI module, write ui-{kebab-name}.json with full page specifications
- Every page must declare requirementRefs and businessFunctionRef
- Every use case must map to at least one page
- All actors from application.json must appear in at least one module&#39;s primaryUsers
- No new requirements — all pages traceable to requirements or use cases

## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`
## Requires

- **application** — `config.application.definition`
- **requirements** — `config.ba.requirements`
- **businessFunctions** — `config.ba.businessFunctions`
- **useCases** — `config.ba.useCases`
- **moduleCatalog** — `config.design.moduleCatalog`
- **entities** — `config.design.entityPattern`

## Produces

- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;ui&#x2F;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;ui&#x2F;ui-{kebab-module-name}.json&quot;}`
## Produces

- **uiCatalog** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;ui&#x2F;ui-catalog.json&quot;}`
- **uiModuleSpec** — `{&quot;to&quot;:&quot;config.design.modules&quot;,&quot;pattern&quot;:&quot;ui&#x2F;ui-{kebab-module-name}.json&quot;}`
