# Generate Diagrams

| | |
|---|---|
| **Name** | `generate_diagrams` |
| **Phase** | governance |
| **Intent** | generate |
| **Calls** | diagram_generation |

## Rules

- Produce LDM, architecture, interaction, and dataflow diagrams
- Keep diagrams derived from canonical artifacts
## Rules

- Produce LDM, architecture, interaction, and dataflow diagrams
- Keep diagrams derived from canonical artifacts

## Requires

- **ldm** — `config.ba.ldmFile`
- **appArchitecture** — `config.design.appArchitecture`
- **catalog** — `config.design.moduleCatalog`
## Requires

- **ldm** — `config.ba.ldmFile`
- **appArchitecture** — `config.design.appArchitecture`
- **catalog** — `config.design.moduleCatalog`
## Requires

- **ldm** — `config.ba.ldmFile`
- **appArchitecture** — `config.design.appArchitecture`
- **catalog** — `config.design.moduleCatalog`

## Produces

- **diagrams** — `{&quot;to&quot;:&quot;config.output.docs&quot;,&quot;pattern&quot;:&quot;diagrams&#x2F;*.md&quot;}`
