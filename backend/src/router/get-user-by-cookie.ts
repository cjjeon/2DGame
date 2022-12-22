import {IsString} from 'class-validator';
import {Request, Response} from 'express'
import User from "../database/models/User";
import errors from "../errors";
import serialize from "./serialize";


export class Payload {
    @IsString()
    cookie: string;
}


const getUserByCookie = async (req: Request, res: Response) => {
    const payload = await serialize(Payload, req.body)

    const user = await User.findOne({where: {cookie: payload.cookie}})
    if (!user) {
        throw new errors.DatabaseObjectNotFound()
    }

    res.status(200).json(JSON.stringify(user))
}


export default getUserByCookie