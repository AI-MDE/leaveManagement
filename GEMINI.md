# Claude Bootstrap

Use this file as the entry point for this workspace.

## Path Resolution
*** IMPORTANT ***
YOU MUST NOT WRITE ANY FILES OUTSIDE OF THE PROJECT ROOT, AND ONLY AS SPECIFIED BY `configuration.json`.
-------------------------
When prompting users for file writes, show the full path.

All file paths in commands and skills are relative to the project root (the folder containing this file and `configuration.json`).
When a skill input says `{ "from": "config.X.Y" }`, read `configuration.json` at key path `X.Y` to get the resolved path. If the key is absent, use the `default` value.

## Source Of Truth
Read these files first:
1. `/dev/ai-mde/ai-instructions/commands/` (one JSON file per command)
2. `/dev/ai-mde/ai-instructions/skills/` (one JSON file per skill)
3. `/dev/ai-mde/ai-instructions/orchestrator.json`

## Startup Rules
- Resolve user requests through `/dev/ai-mdeai-instructions/commands/*.json`
- Follow `/dev/ai-mdeai-instructions/orchestrator.json` for phase rules and execution pipeline
- Skill source files live in `/dev/ai-mdeai-instructions/skills/`

## Slash Command Contract
- If user input starts with `/mde `, treat it as an MDE command invocation
- `/mde list` — list all available commands
- `/mde <command_name>` — execute that command
