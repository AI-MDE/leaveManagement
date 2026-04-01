# Validate Architecture

| | |
|---|---|
| **Name** | `validate_architecture` |
| **Phase** | system_design |
| **Intent** | validate |
| **Calls** | architecture_validation |

## Rules

- Use AI semantic validation for pattern declarations, layer rules, dependency rules, and module alignment
- Return explicit findings with severity and recommended fixes
- Do not mutate architecture artifacts during validation
## Rules

- Use AI semantic validation for pattern declarations, layer rules, dependency rules, and module alignment
- Return explicit findings with severity and recommended fixes
- Do not mutate architecture artifacts during validation
## Rules

- Use AI semantic validation for pattern declarations, layer rules, dependency rules, and module alignment
- Return explicit findings with severity and recommended fixes
- Do not mutate architecture artifacts during validation

## Requires

- **appArchitecture** — `config.design.appArchitecture`
- **catalog** — `config.design.moduleCatalog`
## Requires

- **appArchitecture** — `config.design.appArchitecture`
- **catalog** — `config.design.moduleCatalog`

## Produces

- **report** — `{&quot;to&quot;:&quot;config.output.work&quot;,&quot;pattern&quot;:&quot;architecture-validation-report.json&quot;}`
