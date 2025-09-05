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
// };
import { Sequelize } from "sequelize";


export const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'test_db',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'root',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

