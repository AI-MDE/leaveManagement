# Generate Sample Data

| | |
|---|---|
| **Name** | `generate_sample_data` |
| **Phase** | development |
| **Intent** | generate |
| **Calls** | sample_data_generation |

## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables
## Rules

- Generate sample rows for every entity defined in the LDM
- Respect field types, required flags, and enum values from entity definitions
- **CRITICAL: Generate RFC 4122 v4 UUIDs for all ID fields** (format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx, e.g., 550e8400-e29b-41d4-a716-446655440001)
- Use deterministic UUID generation per entity type (e.g., entities&#x2F;ent-employee.json → 550e8400 prefix, entities&#x2F;ent-leave-type.json → 660e8400 prefix)
- Honour referential integrity — FKs must point to IDs that exist in the generated data
- Seed LeaveType from entity seed_data values exactly
- Generate scripts&#x2F;loadSeedData.js — a Node.js script that reads each output&#x2F;sample-data&#x2F;*.json file and INSERTs rows into the corresponding PostgreSQL table using pg
- loadSeedData.js must insert in dependency order: Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
- loadSeedData.js must use parameterized queries only — no string interpolation of values
- loadSeedData.js must read DB connection config from environment variables: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- loadSeedData.js must load .env file using dotenv to read environment variables

## Requires

- **ldm** — `config.ba.ldmFile`
- **entities** — `config.design.entityPattern`
## Requires

- **ldm** — `config.ba.ldmFile`
- **entities** — `config.design.entityPattern`

## Produces

- **sampleData** — `{&quot;to&quot;:&quot;config.output.sampleData&quot;,&quot;pattern&quot;:&quot;*.json&quot;}`
- **seedScript** — `{&quot;to&quot;:&quot;config.output.src&quot;,&quot;pattern&quot;:&quot;scripts&#x2F;loadSeedData.js&quot;}`
## Produces

- **sampleData** — `{&quot;to&quot;:&quot;config.output.sampleData&quot;,&quot;pattern&quot;:&quot;*.json&quot;}`
- **seedScript** — `{&quot;to&quot;:&quot;config.output.src&quot;,&quot;pattern&quot;:&quot;scripts&#x2F;loadSeedData.js&quot;}`
