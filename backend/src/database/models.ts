import {BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";

@Table
export class Room extends Model {
    @PrimaryKey
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id: string;
    
    @Column({
        type: DataType.BOOLEAN
    })
    isComplete: boolean;

    @CreatedAt
    createdDate: Date
}

@Table
export class User extends Model {
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

    @ForeignKey(() => Room)
    @Column({
        type: DataType.UUID
    })
    roomId: string;

    @BelongsTo(() => Room)
    room: Room;

    @CreatedAt
    createdDate: Date
}

export default {
    Room,
    User
}