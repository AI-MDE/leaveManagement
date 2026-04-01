# Identify Physical Entities

| | |
|---|---|
| **Name** | `identify_physical_entities` |
| **Phase** | design |
| **Intent** | generate |
| **Calls** | physical_entity_identification |

## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements
## Rules

- One entity file per physical table
- Every entity must have a declared owningModule
- Apply data-rules: UUID surrogate PK named id, created_at, updated_at on every table
- Apply concurrency-rules: add version_no for workflow and master_data module types
- Apply audit-rules: add auditRequired flag for workflow_state_changes and approval_decisions
- Derive stateMachine block for workflow entities from requirements and LDM
- Derive rules block for rule_engine entities from business rules in requirements
- Derive indexes from relationships, status fields, and query patterns
- Do not invent entities not present in the LDM or requirements

## Requires

- **ldm** — `config.ba.ldmFile`
- **requirements** — `config.ba.requirements`
- **appArchitecture** — `config.design.appArchitecture`
- **architecture** — `config.mde.architecture`
## Requires

- **ldm** — `config.ba.ldmFile`
- **requirements** — `config.ba.requirements`
- **appArchitecture** — `config.design.appArchitecture`
- **architecture** — `config.mde.architecture`
## Requires

- **ldm** — `config.ba.ldmFile`
- **requirements** — `config.ba.requirements`
- **appArchitecture** — `config.design.appArchitecture`
- **architecture** — `config.mde.architecture`
## Requires

- **ldm** — `config.ba.ldmFile`
- **requirements** — `config.ba.requirements`
- **appArchitecture** — `config.design.appArchitecture`
- **architecture** — `config.mde.architecture`

## Produces

- **entities** — `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}`
