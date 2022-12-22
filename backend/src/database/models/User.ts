import {Column, CreatedAt, DataType, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export default class User extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column(DataType.UUID)
    cookie: string;

    @Column(DataType.STRING)
    username: string;

    @CreatedAt
    createdDate: Date
}