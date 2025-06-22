"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
var typeorm_1 = require("typeorm");
var user_entity_1 = require("./users/entities/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [user_entity_1.User],
    migrations: ['migrations/*.js'], // Caminho correto para migrations após build!
    synchronize: false,
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});
