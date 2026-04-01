# physical_entity_identification

Translate logical data model entities into physical entity definitions — one file per table — applying architecture rules for fields, indexes, state machines, business rules, and events

## Inputs

| Key | Path |
|---|---|
| **ldm** | `config.ba.ldmFile` |
| **requirements** | `config.ba.requirements` |
| **appArchitecture** | `config.design.appArchitecture` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **ldm** | `config.ba.ldmFile` |
| **requirements** | `config.ba.requirements` |
| **appArchitecture** | `config.design.appArchitecture` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **ldm** | `config.ba.ldmFile` |
| **requirements** | `config.ba.requirements` |
| **appArchitecture** | `config.design.appArchitecture` |
| **architecture** | `config.mde.architecture` |
## Inputs

| Key | Path |
|---|---|
| **ldm** | `config.ba.ldmFile` |
| **requirements** | `config.ba.requirements` |
| **appArchitecture** | `config.design.appArchitecture` |
| **architecture** | `config.mde.architecture` |

## Outputs

| Key | Path |
|---|---|
| **entities** | `{&quot;to&quot;:&quot;config.design.entities&quot;,&quot;pattern&quot;:&quot;ent-{entity}.json&quot;}` |

## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
## Rules

- One output file per physical table — filename: ent-{kebab-case-name}.json
- Derive fields from LDM entity attributes; apply data-rules for standard columns
- Add version_no for workflow and master_data module types per concurrency-rules
- Add stateMachine block for workflow module type; derive states and transitions from requirements
- Add rules block for rule_engine module type; derive from business rules in requirements
- Derive indexes from FK columns, status fields, and query patterns stated in requirements
- Set auditRequired true for entities whose module type is workflow or whose changes are in audit-rules scope
- Do not invent entities, fields, or relationships not traceable to the LDM or requirements
- All FK column names use snake_case per data-rules naming convention
