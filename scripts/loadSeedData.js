'use strict';

/**
 * loadSeedData.js
 * Loads all sample data from output/sample-data/ into the PostgreSQL database.
 *
 * Insertion order respects FK dependencies:
 *   Employee → LeaveType → LeaveBalance → LeaveRequest → LeaveAuditEntry → Notification
 *
 * Usage:
 *   DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_PASSWORD=secret DB_NAME=leave_management node scripts/loadSeedData.js
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
const fs          = require('fs');
const path        = require('path');

const SAMPLE_DATA_DIR = path.join(__dirname, '..', 'output', 'sample-data');

const TABLE_MAP = [
  { file: 'employees.json',          table: 'employees' },
  { file: 'leave-types.json',        table: 'leave_types' },
  { file: 'leave-balances.json',     table: 'leave_balances' },
  { file: 'leave-requests.json',     table: 'leave_requests' },
  { file: 'leave-audit-entries.json',table: 'leave_audit_entries' },
  { file: 'notifications.json',      table: 'notifications' },
];

function readJson(filename) {
  const fullPath = path.join(SAMPLE_DATA_DIR, filename);
  if (!fs.existsSync(fullPath)) {
    console.warn(`  [SKIP] File not found: ${fullPath}`);
    return [];
  }
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

async function insertRows(client, table, rows) {
  if (rows.length === 0) return;

  const columns = Object.keys(rows[0]);
  let inserted  = 0;

  for (const row of rows) {
    const values      = columns.map(col => {
      const val = row[col];
      return (val !== null && typeof val === 'object') ? JSON.stringify(val) : val;
    });
    const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `INSERT INTO "${table}" (${columns.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders}) ON CONFLICT DO NOTHING`;

    await client.query(sql, values);
    inserted++;
  }

  console.log(`  [OK] ${table}: ${inserted} row(s) inserted`);
}

async function main() {
  const { DB_HOST = 'localhost', DB_PORT = '5432', DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  if (!DB_USER || !DB_PASSWORD || !DB_NAME) {
    console.error('ERROR: DB_USER, DB_PASSWORD, and DB_NAME environment variables are required.');
    process.exit(1);
  }

  const client = new Client({
    host    : DB_HOST,
    port    : parseInt(DB_PORT, 10),
    user    : DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  await client.connect();
  console.log(`Connected to ${DB_HOST}:${DB_PORT}/${DB_NAME}`);
  console.log('Loading seed data...\n');

  try {
    await client.query('BEGIN');

    for (const { file, table } of TABLE_MAP) {
      const rows = readJson(file);
      await insertRows(client, table, rows);
    }

    await client.query('COMMIT');
    console.log('\nSeed data loaded successfully.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('\nERROR — transaction rolled back:', err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
