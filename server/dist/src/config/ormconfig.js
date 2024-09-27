"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Mysql123",
    database: "quizz",
    entities: ["src/entity/**/*.ts"], // Path to your entities
    synchronize: true, // Automatically sync the database schema with your entities
};
exports.default = config;
