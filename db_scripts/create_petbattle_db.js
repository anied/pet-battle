/* eslint-disable @typescript-eslint/no-var-requires */
const pgAdmin = require('../db/postgres_admin');

// Based on a function provided by ChatGPT
async function createDatabaseIfNotExists(databaseName) {
  console.log('entered createDatabaseIfNotExists');
  if (!databaseName) {
    console.error(
      `No database name provided; databaseName passed as ${databaseName}.  Database not created; exiting...`,
    );
    return;
  }
  try {
    // Connect to the default 'postgres' database to check if the target database exists
    console.log(
      `Attempting to create or connect to database "${databaseName}"...`,
    );
    await pgAdmin.query(`CREATE DATABASE IF NOT EXISTS "${databaseName}";`);
    console.log(
      `Database "${databaseName}" has been created or already exists.`,
    );
  } catch (error) {
    console.error(
      `Error creating database "${databaseName}": ${error.message}`,
    );
  }
}

// async function createAppDb() {
console.log('entered createPetbattleDb');
const databaseName = process.env.APP_DB_NAME;
createDatabaseIfNotExists(databaseName);
// }

// module.exports = createAppDb;
