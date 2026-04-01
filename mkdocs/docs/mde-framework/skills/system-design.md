# system_design

Generate architecture and design artifacts from validated business analysis outputs, following the iterative design process defined in system-design-process.md

## Inputs

| Key | Path |
|---|---|
| **requirements** | `config.ba.requirements` |
| **useCases** | `config.ba.useCasePattern` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **architecture** | `config.mde.architecture` |
| **designProcess** | `config.mde.docs.designProcess` |
| **useCaseMapping** | `config.mde.docs.useCaseMapping` |
## Inputs

| Key | Path |
|---|---|
| **requirements** | `config.ba.requirements` |
| **useCases** | `config.ba.useCasePattern` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **architecture** | `config.mde.architecture` |
| **designProcess** | `config.mde.docs.designProcess` |
| **useCaseMapping** | `config.mde.docs.useCaseMapping` |
## Inputs

| Key | Path |
|---|---|
| **requirements** | `config.ba.requirements` |
| **useCases** | `config.ba.useCasePattern` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **architecture** | `config.mde.architecture` |
| **designProcess** | `config.mde.docs.designProcess` |
| **useCaseMapping** | `config.mde.docs.useCaseMapping` |
## Inputs

| Key | Path |
|---|---|
| **requirements** | `config.ba.requirements` |
| **useCases** | `config.ba.useCasePattern` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **architecture** | `config.mde.architecture` |
| **designProcess** | `config.mde.docs.designProcess` |
| **useCaseMapping** | `config.mde.docs.useCaseMapping` |
## Inputs

| Key | Path |
|---|---|
| **requirements** | `config.ba.requirements` |
| **useCases** | `config.ba.useCasePattern` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **architecture** | `config.mde.architecture` |
| **designProcess** | `config.mde.docs.designProcess` |
| **useCaseMapping** | `config.mde.docs.useCaseMapping` |
## Inputs

| Key | Path |
|---|---|
| **requirements** | `config.ba.requirements` |
| **useCases** | `config.ba.useCasePattern` |
| **businessFunctions** | `config.ba.businessFunctions` |
| **architecture** | `config.mde.architecture` |
| **designProcess** | `config.mde.docs.designProcess` |
| **useCaseMapping** | `config.mde.docs.useCaseMapping` |

## Outputs

| Key | Path |
|---|---|
| **appArchitecture** | `config.design.appArchitecture` |
| **moduleCatalog** | `config.design.moduleCatalog` |
## Outputs

| Key | Path |
|---|---|
| **appArchitecture** | `config.design.appArchitecture` |
| **moduleCatalog** | `config.design.moduleCatalog` |

## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
## Rules

- Module types must be drawn from architecture.json module_types: workflow, master_data, integration, reporting, rule_engine
- Every write use case must produce exactly one Service class and one Command type
- Every read requirement must produce exactly one QueryService class and one ReadDto
- Every aggregate root must have: Entity, Repository port (interface), Repository impl, Mapper
- Reads route through query_service -&gt; data_access — never through service or domain
- Writes route through service -&gt; domain Entity -&gt; data_access
- Requirement-to-module traceability must exist for every business rule
- Patterns must be explicit and drawn from architecture.json patterns
- Runtime components and code modules must be distinguished
