import {ClassConstructor, plainToClass} from "class-transformer";
import {validate} from "class-validator";
import SerializeError from "../errors/SerializeError";

async function serialize<T, V>(cls: ClassConstructor<T>, payload: V): Promise<T> {
    const serialized = plainToClass(cls, payload, {enableImplicitConversion: true})
    const error = await validate(serialized as object, {skipMissingProperties: false})
    if (error.length > 0) {
        throw new SerializeError()
    }
    return serialized
}

export default serialize