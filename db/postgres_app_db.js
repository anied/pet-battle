/* eslint-disable @typescript-eslint/no-var-requires */
const { Sequelize } = require('sequelize');

console.log('entered postgres_app_db.js');

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const PG_USER = process.env.PG_USER;
const PG_DOMAIN = process.env.PG_DOMAIN;
const PG_PORT = process.env.PG_PORT;
const APP_DB_NAME = process.env.APP_DB_NAME;

const connectionString = `postgres://${PG_USER}:${POSTGRES_PASSWORD}@${PG_DOMAIN}:${PG_PORT}/${APP_DB_NAME}`;

console.log(`connectionString: ${connectionString}`);

const pgApp = new Sequelize(connectionString, {
  dialect: 'postgres',
});

console.log('pgAppDb Sequelize instance created');

module.exports = pgApp;
