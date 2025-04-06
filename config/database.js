import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE, DB_PORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // set to true to see SQL logs
});

export default sequelize;
