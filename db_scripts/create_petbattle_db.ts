import { pgAdmin } from 'db/postgres';

// Based on a function provided by ChatGPT
async function createDatabaseIfNotExists(databaseName?: string) {
  if (!databaseName) {
    console.error(
      `No database name provided; databaseName passed as ${databaseName}.  Database not created; exiting...`,
    );
    return;
  }
  try {
    // Connect to the default 'postgres' database to check if the target database exists
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

const databaseName = process.env.PG_DATABASE;

createDatabaseIfNotExists(databaseName);
