#!/usr/bin/env node
'use strict';

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { Client } = require('pg');

async function verifyDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    console.log('✓ Connected to database\n');

    const tables = ['employees', 'leave_types', 'leave_balances', 'leave_requests', 'leave_audit_entries', 'notifications'];
    
    for (const table of tables) {
      const result = await client.query(`SELECT COUNT(*) as count FROM ${table}`);
      console.log(`  ${table}: ${result.rows[0].count} rows`);
    }

    await client.end();
    console.log('\n✓ Database verification complete!');
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  }
}

verifyDatabase();
