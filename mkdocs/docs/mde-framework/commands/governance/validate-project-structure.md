# Validate Project Structure

| | |
|---|---|
| **Name** | `validate_project_structure` |
| **Phase** | governance |
| **Intent** | validate |
| **Calls** | structure_validation |

## Rules

- Verify all configured paths exist
- Report missing folders as blockers
## Rules

- Verify all configured paths exist
- Report missing folders as blockers

## Requires

- **config** — `configuration.json`

## Produces

- **report** — `{&quot;to&quot;:&quot;config.output.work&quot;,&quot;pattern&quot;:&quot;structure-validation-report.json&quot;}`
