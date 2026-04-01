# Generate ERD

| | |
|---|---|
| **Name** | `generate_erd` |
| **Phase** | governance |
| **Intent** | generate |
| **Calls** | diagram_generation |

## Rules

- Generate ERD directly from logical-data-model.json
- Do not invent entities or relationships
## Rules

- Generate ERD directly from logical-data-model.json
- Do not invent entities or relationships

## Requires

- **ldm** — `config.ba.ldmFile`

## Produces

- **erd** — `{&quot;to&quot;:&quot;config.output.docs&quot;,&quot;pattern&quot;:&quot;diagrams&#x2F;erd.md&quot;}`
