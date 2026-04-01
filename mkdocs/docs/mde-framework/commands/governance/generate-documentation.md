# Generate Documentation

| | |
|---|---|
| **Name** | `generate_documentation` |
| **Phase** | governance |
| **Intent** | generate |
| **Calls** | documentation_generation |

## Rules

- Use templates to render project artifacts

## Requires

- **config** — `configuration.json`

## Produces

- **docs** — `{&quot;to&quot;:&quot;config.output.docs&quot;,&quot;pattern&quot;:&quot;*.md&quot;}`
