'use strict';

/**
 * regenerateSeedData.js
 * Regenerates seed data files with valid UUIDs.
 * Maps old placeholder IDs to new valid UUIDs and updates all references.
 */

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const SAMPLE_DATA_DIR = path.join(__dirname, '..', 'output', 'sample-data');

const FILES_TO_PROCESS = [
  'employees.json',
  'leave-types.json',
  'leave-balances.json',
  'leave-requests.json',
  'leave-audit-entries.json',
  'notifications.json',
];

function generateUUIDMapping(data, idField) {
  const mapping = {};
  data.forEach(record => {
    if (record[idField]) {
      mapping[record[idField]] = uuidv4();
    }
  });
  return mapping;
}

function updateReferencesInData(data, mappings) {
  return JSON.parse(JSON.stringify(data), (key, value) => {
    if (typeof value === 'string') {
      // Check if value matches any old ID and replace with new UUID
      for (const [oldId, newId] of Object.entries(mappings)) {
        if (value === oldId) {
          return newId;
        }
      }
    }
    return value;
  });
}

async function main() {
  try {
    console.log('🔄 Regenerating seed data with valid UUIDs...\n');

    let allMappings = {};
    const newData = {};

    // First pass: read all files and generate UUID mappings
    for (const file of FILES_TO_PROCESS) {
      const filePath = path.join(SAMPLE_DATA_DIR, file);
      if (!fs.existsSync(filePath)) {
        console.log(`  [SKIP] ${file} — file not found`);
        continue;
      }

      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (!Array.isArray(data)) {
        console.log(`  [SKIP] ${file} — not an array`);
        continue;
      }

      let idField = null;
      if (file === 'employees.json') idField = 'id';
      else if (file === 'leave-types.json') idField = 'id';
      else if (file === 'leave-balances.json') idField = 'id';
      else if (file === 'leave-requests.json') idField = 'id';
      else if (file === 'leave-audit-entries.json') idField = 'id';
      else if (file === 'notifications.json') idField = 'id';

      if (idField) {
        const mapping = generateUUIDMapping(data, idField);
        allMappings = { ...allMappings, ...mapping };
        newData[file] = { data, mapping };
      }
    }

    // Second pass: update references and write files
    for (const file of FILES_TO_PROCESS) {
      if (!newData[file]) continue;

      const { data } = newData[file];
      const updatedData = updateReferencesInData(data, allMappings);
      const filePath = path.join(SAMPLE_DATA_DIR, file);

      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
      console.log(`  ✓ ${file} — regenerated with valid UUIDs`);
    }

    console.log('\n✓ Seed data regenerated successfully!');
    console.log('\nNext: npm run seed');
  } catch (err) {
    console.error('\n❌ ERROR:', err.message);
    process.exit(1);
  }
}

main();
