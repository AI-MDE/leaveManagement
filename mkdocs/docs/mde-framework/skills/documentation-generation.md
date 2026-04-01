# documentation_generation

Generate project documentation from configuration, architecture, and generated artifacts. Produces SETUP.md covering environment setup, all API endpoints, all UI routes, all run commands, and troubleshooting.

## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **configuration** | `config._self` |
| **moduleCatalog** | `config.design.moduleCatalog` |
| **uiCatalog** | `config.design.uiModules` |
| **uiModuleSpecs** | `config.design.uiModules` |
| **architecture** | `config.mde.architecture` |

## Outputs

| Key | Path |
|---|---|
| **docs** | `output&#x2F;docs` |
| **setup** | `{&quot;to&quot;:&quot;.&quot;,&quot;filename&quot;:&quot;SETUP.md&quot;}` |
## Outputs

| Key | Path |
|---|---|
| **docs** | `output&#x2F;docs` |
| **setup** | `{&quot;to&quot;:&quot;.&quot;,&quot;filename&quot;:&quot;SETUP.md&quot;}` |

## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
## Rules

- CRITICAL: SETUP.md must be written to the project ROOT (next to package.json), not to output&#x2F;docs.
- CRITICAL: The API Endpoints section must list ALL endpoints — GET and mutations (POST, PUT, PATCH, DELETE). Never omit write endpoints.
- CRITICAL: The UI Modules section must list every routed page, including nested detail and form pages (e.g. requests&#x2F;:id&#x2F;modify), not just top-level menu items.
- CRITICAL: The Running section must clearly state that backend and frontend run in SEPARATE terminals simultaneously.
- CRITICAL: The Troubleshooting section must include: blank page &#x2F; wrong role (localStorage.clear()), backend changes not taking effect (rebuild or use npm run dev), port already in use, PostgreSQL not running.
- CRITICAL: The mock auth section must note that login defaults to the highest-privilege role (HR_ADMIN) so all modules are visible during development.
- Derive the API endpoint table from module-catalog.json exposes[] arrays — one row per exposed operation.
- Derive the UI routes table from ui-catalog.json and ui-{module}.json page specs — one row per page.
- Use tables (markdown pipe syntax) for endpoints and UI routes — not bullet lists.
- Do not overwrite canonical source files (schema.sql, configuration.json, etc.).
- Do not include placeholder or example content — all values must be derived from actual configuration.
