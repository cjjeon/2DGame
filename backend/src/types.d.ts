import {User} from "./database/models";

declare module 'express' {
    interface Request {
        user?: User
    }
}

declare module 'socket.io' {
    interface Socket {
        user?: User
    }
}