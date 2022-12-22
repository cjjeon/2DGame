import {IsString} from 'class-validator';
import {Request, Response} from 'express'
import serialize from "./serialize";


export class Payload {
    @IsString()
    cookie: string;
}


const createUserWithoutSignUp = async (req: Request, res: Response) => {
    const payload = await serialize(Payload, req.body)
    res.send(200)
}


export default createUserWithoutSignUp