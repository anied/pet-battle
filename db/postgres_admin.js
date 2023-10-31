/* eslint-disable @typescript-eslint/no-var-requires */
const { Sequelize } = require('sequelize');

console.log('entered postgres_admin.js');

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const PG_USER = process.env.PG_USER;
const PG_DOMAIN = process.env.PG_DOMAIN;
const PG_PORT = process.env.PG_PORT;

const connectionString = `postgres://${PG_USER}:${POSTGRES_PASSWORD}@${PG_DOMAIN}:${PG_PORT}/postgres`;

console.log(`connectionString: ${connectionString}`);

const pgAdmin = new Sequelize(connectionString, {
  dialect: 'postgres',
});

console.log('pgAdmin Sequelize instance created');

module.exports = pgAdmin;
