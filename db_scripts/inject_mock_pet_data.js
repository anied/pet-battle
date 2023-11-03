/* eslint-disable @typescript-eslint/no-var-requires */
// This file is intended to be run as a standalone script, not as part of the app.
const fs = require('fs');
const pgApp = require('../db/postgres_app_db');

// Based on a function provided by ChatGPT
async function injectMockData() {
  console.log('entered injectMockData');
  try {
    // Connect to the default 'postgres' database to check if the target database exists
    console.log(`Attempting to inject mock data into pet table"...`);

    // Inject mock data
    const mockData = fs.readFileSync('./db_scripts/mock_pets.sql', 'utf8');
    await pgApp.query(mockData);
    console.log(`Mock data has been injected into \`pet\` table.`);
  } catch (error) {
    console.error(
      `Error injecting mock data into \`pet\` table": ${error.message}`,
    );
  }
}

console.log('entered injectMockData');
injectMockData();
