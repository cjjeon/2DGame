import {NextFunction, Request, Response} from "express";
import auth from "../auth";
import {User} from "../database/models";
import errors from "../errors";

const authorizeHandler = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies || !('access_token' in req.cookies)) {
        throw new errors.AuthenticationError()
    }

    const token = req.cookies.access_token;
    if (!token) {
        throw new errors.AuthenticationError()
    }
    const userToken = auth.verifyToken(token)
    const user = await User.findOne({where: {id: userToken.id}})

    if (!user) {
        throw new errors.AuthenticationError()
    }
    req.user = user
    next()
}

export default authorizeHandler