import {Sequelize} from "sequelize-typescript";
import config from "../config";
import User from "./models/User";

const sequelize = new Sequelize({
    models: [User],
    database: config.DB_CONFIG.database,
    host: config.DB_CONFIG.host,
    username: config.DB_CONFIG.username,
    password: config.DB_CONFIG.password,
    port: config.DB_CONFIG.port,
    dialect: 'postgres'
})

sequelize.sync({force: true})

export default sequelize