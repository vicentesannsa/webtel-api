import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOSTNAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from '../config.js';

const options = {
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    host: DB_HOSTNAME,
    port: DB_PORT,
    timezone: 'America/Santiago'
};

const connection = await mysql.createConnection(options);

export default connection;
