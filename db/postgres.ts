import { Sequelize } from 'sequelize';

const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const PG_USER = process.env.PGUSER;
const PG_DOMAIN = process.env.PG_DOMAIN;
const PG_PORT = process.env.PG_PORT;
const PG_DATABASE = process.env.PG_DATABASE;

const sequelize = new Sequelize(
  `postgres://${PG_USER}:${POSTGRES_PASSWORD}@${PG_DOMAIN}:${PG_PORT}/${PG_DATABASE}`,
  {
    dialect: 'postgres',
  },
);

const pgAdmin = new Sequelize(
  `postgres://${PG_USER}:${POSTGRES_PASSWORD}@${PG_DOMAIN}:${PG_PORT}/postgres`,
  {
    dialect: 'postgres',
  },
);

export default sequelize;

export { pgAdmin };
