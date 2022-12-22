import {Sequelize} from "sequelize-typescript";
import config from "../config";
import {Room, User} from "./models";

const sequelize = new Sequelize({
    models: [User, Room],
    database: config.DB_CONFIG.database,
    host: config.DB_CONFIG.host,
    username: config.DB_CONFIG.username,
    password: config.DB_CONFIG.password,
    port: config.DB_CONFIG.port,
    dialect: 'postgres'
})

// sequelize.sync({force: true})

export default sequelize
