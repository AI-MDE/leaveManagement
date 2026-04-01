# mdt_orchestrator v1.1

Command-driven orchestrator for this workspace&#39;s AI-assisted model-driven engineering workflow.

## Execution Pipeline

1. **resolve_command** — Map user input to a canonical command in mde&#x2F;ai-instructions&#x2F;commands&#x2F;*.json
2. **load_context** — Load AGENT.md, orchestration registries, BA artifacts, and optional project state&#x2F;configuration files
3. **check_prerequisites** — Verify that all required artifacts for the command exist
4. **validate_phase_rules** — Ensure the command is valid for the current phase or explicitly allowed cross-phase
5. **select_skills_and_tools** — Read the command definition and determine which skills and tools to invoke
6. **execute_skill_flow** — Invoke skill flows in order and let each skill call its permitted tools
7. **persist_outputs** — Write generated or validated artifacts to the configured BA and project paths. MUST complete before steps 8 and 9.
8. **update_project_state** — MANDATORY: Update project&#x2F;project-state.json — set current_phase, last_command, last_run_at, recommended_next_command, next_valid_commands (with reasons), and artifact statuses. Create the file if it does not exist. Never skip this step.
9. **append_command_log** — MANDATORY: Append one entry to project&#x2F;logs&#x2F;command-log.json per logging_policy. Create the file with { &quot;entries&quot;: [] } if it does not exist. Never skip this step, even on failure or partial output.
10. **return_result** — Return the response_contract payload. Do not return until steps 8 and 9 are complete.

## Phase Rules

### project_initiation

**Allowed commands:** select_methodology, select_architecture

- { config.project_state.state } exists or initialization was intentionally skipped

### business_analysis

**Allowed commands:** identify_domain, identify_external_references, perform_business_analysis, generate_business_functions, generate_use_cases, validate_requirements

- { config.ba.requirements } exists
- { config.ba.analysisStatus } exists
- { config.project_state.questions } exists
- { config.project_state.openQueue } exists

### system_design

**Allowed commands:** build_system_design, generate_ldm, validate_ldm_coverage, generate_modules, elaborate_system_design, generate_ui_outline, validate_architecture

- { config.design.appArchitecture } exists
- { config.design.moduleCatalog } exists
- at least one module definition exists in { config.design.modules }

### development

**Allowed commands:** generate_source_code, generate_ui_source_code, generate_sample_data

- development artifacts exist for the target command

### governance

**Allowed commands:** assess_methodology, assess_architecture, validate_traceability, show_phase_status, generate_diagrams, generate_documentation



## Interaction Policy

- Execute exactly one command per user turn — never chain commands automatically.
- After a command completes, stop. Report results and next_valid_commands, then wait for the user.
- Ambiguous input like &#39;continue&#39; must be resolved by showing next_valid_commands and asking the user to pick one — never infer and auto-execute.
- Do not infer intent to run multiple commands from vague instructions. Ask instead.
- The user must explicitly invoke each next command.

## Tool Policy

- file_manager is the default tool for artifact I&#x2F;O.
- json_validator must be used when a command produces or validates JSON artifacts.
- traceability_engine must be used for end-to-end trace checks.
- architecture_validator must be used for architecture conformance checks.
- No tool may write outside configured project paths.
- The MDE framework folder (config.mde.path) is READ-ONLY. Skills and commands MUST NOT write any files into it. All output goes to project paths defined in configuration.json under ba, design, project_state, application, output, or test.
