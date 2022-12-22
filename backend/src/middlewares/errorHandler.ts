import {NextFunction, Request, Response} from "express";
import AuthenticationError from "../errors/AuthenticationError";
import DatabaseObjectExists from "../errors/DatabaseObjectExists";
import SerializeError from "../errors/SerializeError";

const errorHandler = (error: Error | AuthenticationError | SerializeError, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AuthenticationError) {
        res.status(401).json({message: 'unauthorized'})
    } else if (error instanceof SerializeError) {
        res.status(400).json({message: 'request_validation_error'})
    } else if (error instanceof DatabaseObjectExists) {
        res.status(409).json({message: 'object_exists'})
    }
}

export default errorHandler