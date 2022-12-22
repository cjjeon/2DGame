import {NextFunction, Request, Response} from "express";
import auth from "../auth";
import errors from "../errors";

const authorizeHandler = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies || !('access_token' in req.cookies)) {
        throw new errors.AuthenticationError()
    }

    const token = req.cookies.access_token;
    if (!token) {
        throw new errors.AuthenticationError()
    }
    try {
        req.user = auth.verifyToken(token)
        return next()
    } catch {
        throw new errors.AuthenticationError()
    }
}

export default authorizeHandler