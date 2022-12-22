import jwt from 'jsonwebtoken'
import config from "./config";
import errors from './errors'


const generateToken = (): string => {
    // TODO add some data
    return jwt.sign({}, config.JWT_SECRET_KEY)
}


const verifyToken = (token: string) => {
    const verify = jwt.verify(token, config.JWT_SECRET_KEY)
    if (!verify) {
        throw new errors.AuthenticationError()
    }
    return verify
}