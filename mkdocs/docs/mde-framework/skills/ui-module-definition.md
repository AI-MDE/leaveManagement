# ui_module_definition

Design UI modules and pages for the application — derived from user tasks, use cases, business functions, and domain entities. Produces a structured UI module catalog and per-module page specifications ready for UI source code generation.

## Inputs

| Key | Path |
|---|---|
| **application** | `config.application.definition` |
| **requirements** | `config.ba.requirements` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **useCases** | `config.ba.useCases` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
## Inputs

| Key | Path |
|---|---|
| **application** | `config.application.definition` |
| **requirements** | `config.ba.requirements` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **useCases** | `config.ba.useCases` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
## Inputs

| Key | Path |
|---|---|
| **application** | `config.application.definition` |
| **requirements** | `config.ba.requirements` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **useCases** | `config.ba.useCases` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
## Inputs

| Key | Path |
|---|---|
| **application** | `config.application.definition` |
| **requirements** | `config.ba.requirements` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **useCases** | `config.ba.useCases` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
## Inputs

| Key | Path |
|---|---|
| **application** | `config.application.definition` |
| **requirements** | `config.ba.requirements` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **useCases** | `config.ba.useCases` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
## Inputs

| Key | Path |
|---|---|
| **application** | `config.application.definition` |
| **requirements** | `config.ba.requirements` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **useCases** | `config.ba.useCases` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |

## Outputs

| Key | Path |
|---|---|
| **uiModuleCatalog** | `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}` |
| **uiModuleSpec** | `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}` |
## Outputs

| Key | Path |
|---|---|
| **uiModuleCatalog** | `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-catalog.json&quot;}` |
| **uiModuleSpec** | `{&quot;to&quot;:&quot;config.design.uiModules&quot;,&quot;pattern&quot;:&quot;ui-{kebab-module-name}.json&quot;}` |

## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
## Rules

- Read application.json for actors — all primaryUsers and requiredRoles must reference defined actors
- Read use-case files — each use case must map to at least one page
- Design from user tasks, not database tables — derive pages from what actors need to accomplish
- Every page must declare requirementRefs and businessFunctionRef — no untraced pages
- Prefer dashboard, list, detail, and form patterns — use wizard only for branching multi-step flows
- Keep navigation shallow — routePrefix + one sub-path level maximum
- Each drill-down must appear in both drillsInto on the source page and navigation.flows
- Actions of type delete must be type confirm — never a direct destructive action
- Filters only where data volume or search need is identified in requirements
- Validation rules required on all form pages — must align with DomainValidator constraints where applicable
- RequiredRoles must map directly to the Actors defined in the requirements baseline
- emptyState required on all list and dashboard pages
- backendModules must reference module IDs from module-catalog.json
- relatedEntities must reference entity names from entity files
- Priority: core &#x3D; required for MVP, secondary &#x3D; important but deferrable, optional &#x3D; nice-to-have
- One UI module per cohesive user workflow — do not split a single workflow across modules
- No new requirements — all pages must be traceable to requirements or use cases
- ui-catalog.json must include a top-level menu array — one entry per UI module, ordered by actor priority (core modules first), with the module&#39;s entryPoint route
- navigation.menuVisible must be true for pages reachable directly from the menu, false for pages only reachable via in-page flows
- subNav is optional — include only when a module has 3 or more peer sections that warrant a persistent tab bar (e.g. HR Admin with Leave Types &#x2F; Balances &#x2F; Requests tabs); omit for simple linear workflows
- navigation.flows covers in-page transitions only — menu-level navigation is covered by the catalog menu array
