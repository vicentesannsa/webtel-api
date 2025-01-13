import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const options = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOSTNAME,
    port: process.env.DB_PORT,
    timezone: 'America/Santiago'
};

const connection = await mysql.createConnection(options);

export default connection;
