// src/db.ts
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  'EnergeX',
  'yaswanth',
  'secret',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database successfully.');
  } catch (err) {
    console.error('Unable to connect to MySQL:', err);
  }
};
