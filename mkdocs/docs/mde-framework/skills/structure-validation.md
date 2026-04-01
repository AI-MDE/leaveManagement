# structure_validation

Validate that the physical folder structure matches the configuration

## Inputs

| Key | Path |
|---|---|
| **config** | `configuration.json` |

## Outputs

| Key | Path |
|---|---|
| **report** | `{&quot;to&quot;:&quot;config.output.work&quot;,&quot;pattern&quot;:&quot;structure-validation-report.json&quot;}` |

## Rules

- Fail if critical root folders are missing
- Warn if optional folders are missing
## Rules

- Fail if critical root folders are missing
- Warn if optional folders are missing
