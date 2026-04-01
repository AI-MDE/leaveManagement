# Generate SQL Schema

| | |
|---|---|
| **Name** | `generate_sql` |
| **Phase** | design |
| **Intent** | generate |
| **Calls** |  |

## Rules

- First run writes schema.sql and schema-state.json — no alter file
- Subsequent runs diff against schema-state.json and write alter-YYYY-MM-DD.sql with only the changes
- Dropped tables and columns are commented out — never auto-applied
- Reads entity fields, indexes, and relationships from design&#x2F;entities&#x2F;ent-*.json
- Entity type mapping: uuid → UUID, string → VARCHAR(255), decimal → NUMERIC, datetime → TIMESTAMPTZ, enum → VARCHAR(50) with CHECK constraint
## Rules

- First run writes schema.sql and schema-state.json — no alter file
- Subsequent runs diff against schema-state.json and write alter-YYYY-MM-DD.sql with only the changes
- Dropped tables and columns are commented out — never auto-applied
- Reads entity fields, indexes, and relationships from design&#x2F;entities&#x2F;ent-*.json
- Entity type mapping: uuid → UUID, string → VARCHAR(255), decimal → NUMERIC, datetime → TIMESTAMPTZ, enum → VARCHAR(50) with CHECK constraint
## Rules

- First run writes schema.sql and schema-state.json — no alter file
- Subsequent runs diff against schema-state.json and write alter-YYYY-MM-DD.sql with only the changes
- Dropped tables and columns are commented out — never auto-applied
- Reads entity fields, indexes, and relationships from design&#x2F;entities&#x2F;ent-*.json
- Entity type mapping: uuid → UUID, string → VARCHAR(255), decimal → NUMERIC, datetime → TIMESTAMPTZ, enum → VARCHAR(50) with CHECK constraint
## Rules

- First run writes schema.sql and schema-state.json — no alter file
- Subsequent runs diff against schema-state.json and write alter-YYYY-MM-DD.sql with only the changes
- Dropped tables and columns are commented out — never auto-applied
- Reads entity fields, indexes, and relationships from design&#x2F;entities&#x2F;ent-*.json
- Entity type mapping: uuid → UUID, string → VARCHAR(255), decimal → NUMERIC, datetime → TIMESTAMPTZ, enum → VARCHAR(50) with CHECK constraint
## Rules

- First run writes schema.sql and schema-state.json — no alter file
- Subsequent runs diff against schema-state.json and write alter-YYYY-MM-DD.sql with only the changes
- Dropped tables and columns are commented out — never auto-applied
- Reads entity fields, indexes, and relationships from design&#x2F;entities&#x2F;ent-*.json
- Entity type mapping: uuid → UUID, string → VARCHAR(255), decimal → NUMERIC, datetime → TIMESTAMPTZ, enum → VARCHAR(50) with CHECK constraint

## Requires

- **entities** — `config.design.entityPattern`

## Produces

- **schema** — `config.design.schema`
- **schemaState** — `config.design.schemaState`
- **alterScript** — `{&quot;to&quot;:&quot;config.design.sql&quot;,&quot;pattern&quot;:&quot;alter-{date}.sql&quot;}`
## Produces

- **schema** — `config.design.schema`
- **schemaState** — `config.design.schemaState`
- **alterScript** — `{&quot;to&quot;:&quot;config.design.sql&quot;,&quot;pattern&quot;:&quot;alter-{date}.sql&quot;}`
## Produces

- **schema** — `config.design.schema`
- **schemaState** — `config.design.schemaState`
- **alterScript** — `{&quot;to&quot;:&quot;config.design.sql&quot;,&quot;pattern&quot;:&quot;alter-{date}.sql&quot;}`
