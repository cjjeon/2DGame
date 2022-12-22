import {Column, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUIDV4,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column(DataType.UUIDV4)
    cookieId: string;

    @Column(DataType.STRING)
    username: string;
}