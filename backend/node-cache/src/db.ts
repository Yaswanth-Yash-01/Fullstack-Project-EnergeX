// src/db.ts
// import { Sequelize } from 'sequelize';

// export const sequelize = new Sequelize(
//   'EnergeX',
//   'yaswanth',
//   'secret',
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//   }
// );

// export const testConnection = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('Connected to MySQL database successfully.');
//   } catch (err) {
//     console.error('Unable to connect to MySQL:', err);
//   }
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  }
);


