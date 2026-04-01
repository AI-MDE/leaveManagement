# Generate Source Code

| | |
|---|---|
| **Name** | `generate_source_code` |
| **Phase** | development |
| **Intent** | generate |
| **Calls** | source_code_generation |

## Rules

- Generate code from module specs
- Respect architecture layer rules
- Generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers must include method-level traceability docs with @requirement and @design_concern tags
## Rules

- Generate code from module specs
- Respect architecture layer rules
- Generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers must include method-level traceability docs with @requirement and @design_concern tags
## Rules

- Generate code from module specs
- Respect architecture layer rules
- Generated methods in controller&#x2F;service&#x2F;domain&#x2F;query_service&#x2F;data_access layers must include method-level traceability docs with @requirement and @design_concern tags

## Requires

- **moduleDefinitions** — `config.design.modules`

## Produces

- **src** — `{&quot;to&quot;:&quot;config.output.src&quot;,&quot;pattern&quot;:&quot;{module}&#x2F;**&#x2F;*.ts&quot;}`
- **manifest** — `config.output.manifest`
## Produces

- **src** — `{&quot;to&quot;:&quot;config.output.src&quot;,&quot;pattern&quot;:&quot;{module}&#x2F;**&#x2F;*.ts&quot;}`
- **manifest** — `config.output.manifest`
