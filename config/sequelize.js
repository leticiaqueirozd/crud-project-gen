import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize({
  username: process.env.DB_USERNAME || 'defaultUsername',
  password: process.env.DB_PASSWORD || 'defaultPassword',
  database: process.env.DB_NAME || 'defaultDatabase',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
});

export default sequelize;
