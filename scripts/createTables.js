'use strict';

/**
 * createTables.js
 * Creates database tables from SQL schema.
 * Reads configuration.json for schema file location.
 *
 * Usage:
 *   npm run create-tables
 *
 * Environment variables:
 *   DB_HOST      PostgreSQL host (default: localhost)
 *   DB_PORT      PostgreSQL port (default: 5432)
 *   DB_USER      PostgreSQL user (required)
 *   DB_PASSWORD  PostgreSQL password (required)
 *   DB_NAME      PostgreSQL database name (required)
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function main() {
  const { DB_HOST = 'localhost', DB_PORT = '5432', DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error('ERROR: DB_USER, DB_PASSWORD, and DB_NAME environment variables are required.');
    console.error('Check your .env file and ensure these variables are set.');
    process.exit(1);
  }

  try {
    // Read configuration.json to get schema path
    const configPath = path.resolve(__dirname, '..', 'configuration.json');
    if (!fs.existsSync(configPath)) {
      throw new Error(`configuration.json not found at ${configPath}`);
    }

    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // Get SQL directory path from config: "/dev/leaveManagement/design/sql"
    // Convert to relative path: "design/sql"
    const sqlDirConfig = config.design.sql;
    const relativeSqlDir = sqlDirConfig.replace(/^\/dev\/leaveManagement\//, '');
    const schemaPath = path.resolve(__dirname, '..', relativeSqlDir, 'schema.sql');

    // Read SQL schema file
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`SQL schema file not found at ${schemaPath}\n  Expected: ${relativeSqlDir}/schema.sql`);
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Connect to database
    const client = new Client({
      host: DB_HOST,
      port: parseInt(DB_PORT, 10),
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    await client.connect();
    console.log(`✓ Connected to ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    console.log(`✓ Reading schema from: ${schemaPath}`);
    console.log('Creating tables...\n');

    // Execute schema
    await client.query(schema);

    console.log('✓ Tables created successfully!');
    console.log('\nNext steps:');
    console.log('  1. Load sample data: npm run seed');
    console.log('  2. Start backend: npm run dev');
    console.log('  3. Start frontend (in ui/): npm run dev');

    await client.end();
  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    process.exit(1);
  }
}

main();
