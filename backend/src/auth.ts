import jwt from 'jsonwebtoken'
import config from "./config";
import User from "./database/models/User";
import errors from './errors'


const generateToken = (user: User): string => {
    return jwt.sign(JSON.stringify(user), config.JWT_SECRET_KEY)
}


const verifyToken = (token: string): User => {
    const verify = jwt.verify(token, config.JWT_SECRET_KEY)
    if (!verify) {
        throw new errors.AuthenticationError()
    }
    return verify as User
}

export default {
    generateToken,
    verifyToken
}