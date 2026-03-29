#!/usr/bin/env node
'use strict';

/**
 * resetDatabase.js
 * Drops all tables and recreates them from schema
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });

const { Client } = require('pg');

async function resetDatabase() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    await client.connect();
    console.log(`Connected to ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    // Drop all tables in reverse dependency order
    const dropSQL = `
      DROP TABLE IF EXISTS notifications CASCADE;
      DROP TABLE IF EXISTS leave_audit_entries CASCADE;
      DROP TABLE IF EXISTS leave_requests CASCADE;
      DROP TABLE IF EXISTS leave_balances CASCADE;
      DROP TABLE IF EXISTS leave_types CASCADE;
      DROP TABLE IF EXISTS employees CASCADE;
    `;

    console.log('Dropping existing tables...');
    await client.query(dropSQL);
    console.log('✓ All tables dropped');

    await client.end();
  } catch (err) {
    console.error('ERROR:', err.message);
    process.exit(1);
  }
}

resetDatabase();
