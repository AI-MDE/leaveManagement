# ui_source_code_generation

Generate frontend UI source code from UI module specs. Produces one component per page, a router, shared layout with menu, and an auth guard — all derived from ui-catalog.json and ui-{module}.json specs.

## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **application** | `config.application.definition` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **entities** | `config.design.entityPattern` |
| **architecture** | `config.mde.architecture` |

## Outputs

| Key | Path |
|---|---|
| **uiSrc** | `ui&#x2F;src` |

## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
## Rules

- CRITICAL: config.design.uiModules is the INPUT folder (read-only spec files). config.output.uiSrc is the OUTPUT folder (write all generated code here). Never write into config.design.uiModules.
- CRITICAL: Generate .tsx &#x2F; .ts files only — never .ejs, .hbs, .html, .vue, or any other template format unless config.ui.framework explicitly says so.
- CRITICAL: The Vite proxy must NOT include a rewrite that strips &#x2F;api. Backend routes are registered as &#x2F;api&#x2F;... so the prefix must be forwarded intact.
- CRITICAL: The router must include a default index redirect at the root authenticated route: { index: true, element: &lt;Navigate to&#x3D;&#39;&#x2F;{first-module-route}&#39; replace &#x2F;&gt; }. Without this, visiting &#39;&#x2F;&#39; shows a blank page.
- CRITICAL: Never generate duplicate .js and .tsx files for the same component. Generate .tsx only. If legacy .js files exist they will shadow the .tsx and the fix will appear to have no effect.
- CRITICAL: All mutation onSuccess handlers must call queryClient.invalidateQueries() for every affected query key before navigating. Without this the list page shows stale cached data after save.
- CRITICAL: Error messages shown to users must render the actual server error from error.response.data.error — not a hardcoded generic string. Use: (error as any)?.response?.data?.error ?? error?.message ?? &#39;fallback message&#39;.
- Read config.ui for framework and styling choices before generating any file
- Read ui-catalog.json menu array to build the router and Sidebar — menu order &#x3D; route order
- Read each ui-{module}.json for page specs — one component per page
- subNav in a module spec → render a TabBar or secondary nav within the module&#39;s AppShell slot
- navigation.menuVisible&#x3D;true pages are direct routes; menuVisible&#x3D;false pages are nested&#x2F;child routes
- Every page component receives typed props — no any
- Derive column and field names from shows[] and validation[] in the page spec — do not invent fields
- Every form must implement all validation rules from the page spec
- All list pages must render emptyState string when the data array is empty
- All delete&#x2F;destructive actions must show a confirm dialog before proceeding
- Do not generate mock data or hardcoded values — all data comes from api&#x2F; functions
- Do not overwrite scaffold files (package.json, tsconfig.json, vite.config.ts) if they already exist
- Never write outside config.output.uiSrc
- The sidebar menu filters items by user role — mock auth must default to the highest-privilege role (HR_ADMIN or equivalent) so all modules are visible during development.
- tsconfig.json exclude must include src&#x2F;test to prevent test files from breaking the production build.
- Any type used in a page component (e.g. actorName on an audit entry) must be declared in the corresponding type file in src&#x2F;types&#x2F;. Cross-check all page field references against the type definitions before generating.
