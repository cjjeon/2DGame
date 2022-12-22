import dotenv from 'dotenv'

dotenv.config();

const PORT = process.env.PORT || 4001;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'local';


export default {
    PORT,
    JWT_SECRET_KEY
}