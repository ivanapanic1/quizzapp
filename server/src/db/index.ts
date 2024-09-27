import mysql from "mysql2";
import dbConfig from "../config/db.config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "../config/ormconfig";
export default mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});


//
// createConnection(config).then(() => {
//     console.log('Database connection established.');
// }).catch(error => {
//     console.error('Database connection error:', error);
// });