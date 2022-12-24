export interface Position {
    x: number;
    y: number;
}

export interface Boss {
    health: number
}

export interface Player {
    userId: string
    username: string
    health: number
    position: Position
}

export enum RoomStatus {
    WAITING,
    STARTED,
    COMPLETED
}

export interface Room {
    id: string
    status: RoomStatus
    players: Player[]
    boss: Boss
}
