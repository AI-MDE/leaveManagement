# source_code_generation

Generate application source code from module specifications, following the layer structure and naming conventions in architecture.json

## Inputs

| Key | Path |
|---|---|
| **architecture** | `config.mde.architecture` |
| **moduleSchema** | `config.design.modules` |
| **moduleRules** | `config.design.modules` |
| **stateMachine** | `config.design.modules` |
| **events** | `config.design.modules` |
| **api** | `config.design.modules` |
## Inputs

| Key | Path |
|---|---|
| **architecture** | `config.mde.architecture` |
| **moduleSchema** | `config.design.modules` |
| **moduleRules** | `config.design.modules` |
| **stateMachine** | `config.design.modules` |
| **events** | `config.design.modules` |
| **api** | `config.design.modules` |
## Inputs

| Key | Path |
|---|---|
| **architecture** | `config.mde.architecture` |
| **moduleSchema** | `config.design.modules` |
| **moduleRules** | `config.design.modules` |
| **stateMachine** | `config.design.modules` |
| **events** | `config.design.modules` |
| **api** | `config.design.modules` |
## Inputs

| Key | Path |
|---|---|
| **architecture** | `config.mde.architecture` |
| **moduleSchema** | `config.design.modules` |
| **moduleRules** | `config.design.modules` |
| **stateMachine** | `config.design.modules` |
| **events** | `config.design.modules` |
| **api** | `config.design.modules` |
## Inputs

| Key | Path |
|---|---|
| **architecture** | `config.mde.architecture` |
| **moduleSchema** | `config.design.modules` |
| **moduleRules** | `config.design.modules` |
| **stateMachine** | `config.design.modules` |
| **events** | `config.design.modules` |
| **api** | `config.design.modules` |
## Inputs

| Key | Path |
|---|---|
| **architecture** | `config.mde.architecture` |
| **moduleSchema** | `config.design.modules` |
| **moduleRules** | `config.design.modules` |
| **stateMachine** | `config.design.modules` |
| **events** | `config.design.modules` |
| **api** | `config.design.modules` |

## Outputs

| Key | Path |
|---|---|
| **src** | `{&quot;to&quot;:&quot;config.output.src&quot;,&quot;pattern&quot;:&quot;{module}&#x2F;**&#x2F;*.ts&quot;}` |

## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
## Rules

- Read architecture.json for folder structure, naming conventions, and layer rules before generating
- Follow codegen.structure.layers for output paths — src&#x2F;{module}&#x2F;domain&#x2F;, src&#x2F;{module}&#x2F;service&#x2F;, etc.
- Follow codegen.naming for class and file naming conventions
- Entity must expose create() factory for new instances and rehydrate() factory for repository reconstruction
- Service class: one public method per use case — authorize, load, act, save, emit event
- QueryService: stateless, reads only, returns ReadDto — must not touch domain layer
- Mapper: pure field translation only — no business logic
- Repository implementation: raw SQL, parameterized queries only
- Commands: one per write operation, fields only, no behavior
- Method-level traceability docs are mandatory for generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers
- Each method doc block must include @requirement and @design_concern tags; add @use_case when applicable
- Requirement references in method docs must be valid IDs from BA artifacts (FR-*, BR-*, NFR-*), or INTERNAL for technical-only methods
- Event types: typed aliases of DomainEvent&lt;T&gt; — base type in shared&#x2F;events&#x2F;domain-event.ts
- DomainEventPublisher interface in shared&#x2F;events&#x2F;domain-event-publisher.ts
- Emit deterministic outputs — same inputs must produce same outputs
- Read config.test.* for test output paths — default to test&#x2F;unit and test&#x2F;integration
- Unit tests go to test&#x2F;unit&#x2F;{module}&#x2F; — cover domain (entity, validator, state-machine) and service layers; mock all dependencies
- Integration tests go to test&#x2F;integration&#x2F;{module}&#x2F; — cover data_access (repository against real DB) and controller (HTTP); no mocks
- Test framework is Jest — use describe&#x2F;it&#x2F;expect; import from jest for mocks
- Each service test: one describe block per service class, one it() per error condition and one for the happy path
- Each entity test: cover create(), rehydrate(), and every state transition method
- Each validator test: cover every rule — one it() per pass case and one per throw case
- Do not generate test files for dto, mapper, or repository interface layers
- Generate package.json if it does not exist — derive name and version from config.project, tech stack from architecture.json; always include jest scripts for unit and integration
- Generate tsconfig.json if it does not exist — derive target and module from architecture.json tech; outDir&#x3D;dist, rootDir&#x3D;src, exclude test&#x2F;
- Never overwrite package.json or tsconfig.json if they already exist
- CRITICAL: The generated src&#x2F;index.ts (Express entry point) must include ALL write endpoints (POST, PUT, PATCH, DELETE) for every module, not just GET endpoints. For every module that has create&#x2F;update&#x2F;delete operations, generate the corresponding mutation routes. Missing mutation endpoints cause silent 404 failures in the UI.
- CRITICAL: Every mutation endpoint response must include a descriptive error message in the JSON body under the &#39;error&#39; key — e.g. { error: &#39;Leave request not found or cannot be modified&#39; }. Generic 500 responses without detail make debugging impossible.
- CRITICAL: The dev script must be &#39;ts-node src&#x2F;index.ts&#39;. The start script must be &#39;node dist&#x2F;index.js&#39;. Never swap them. Running start before build causes 404s from a stale dist&#x2F;.
- The package.json must include a &#39;dev&#39; script using ts-node for development without a build step.
