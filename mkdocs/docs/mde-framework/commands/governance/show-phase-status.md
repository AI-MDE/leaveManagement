# Show Phase Status

| | |
|---|---|
| **Name** | `show_phase_status` |
| **Phase** | governance |
| **Intent** | inspect |
| **Calls** | governance_validation |

## Rules

- Report complete, in-progress, blocked, and missing artifacts per phase

## Requires

- **projectState** — `config.project_state.state`
- **methodology** — `config.mde.methodology`
## Requires

- **projectState** — `config.project_state.state`
- **methodology** — `config.mde.methodology`

## Produces

- **report** — `{&quot;to&quot;:&quot;config.output.work&quot;,&quot;pattern&quot;:&quot;phase-status-report.json&quot;}`
