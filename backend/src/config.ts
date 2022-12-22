import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 4001;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'local';

interface DbConfig {
    host: string
    port: number
    database: string
    username: string
    password: string
}

const DB_CONFIG: DbConfig = {
    host: process.env.DB_DATABASE || 'localhost',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) || 5432 : 5432,
    database: process.env.DB_DATABASE || 'funproject',
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
}

export default {
    PORT,
    JWT_SECRET_KEY,
    DB_CONFIG
}