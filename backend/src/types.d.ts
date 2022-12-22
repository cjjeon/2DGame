import User from "./database/models/User";

declare module 'express' {
    interface Request {
        user?: User
    }
}