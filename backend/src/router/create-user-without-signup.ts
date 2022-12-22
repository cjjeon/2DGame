import {IsString} from 'class-validator';
import {Request, Response} from 'express'
import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";
import sequelize from "../database/client";
import User from "../database/models/User";
import errors from "../errors";
import serialize from "./serialize";


export class Payload {
    @IsString()
    cookie: string;
}


const createUserWithoutSignUp = async (req: Request, res: Response) => {
    const payload = await serialize(Payload, req.body)
    const username = uniqueNamesGenerator({dictionaries: [adjectives, colors, animals]})
    const transaction = await sequelize.transaction()

    try {
        await User.create({cookie: payload.cookie, username: username}, {transaction})
        await transaction.commit()
    } catch (error) {
        await transaction.rollback()
        throw new errors.DatabaseObjectExists()
    }

    res.send(200)
}


export default createUserWithoutSignUp