export interface Position {
    x: number,
    y: number
}

export enum UserAnimation {
    STALE = 'STALE',
    MOVING = 'MOVING',
    ATTACK = 'ATTACK'
}

export interface UserState {
    currentPosition: Position,
    desiredPosition: Position,
    health: number,
    animation: UserAnimation
}

export const DEFAULT_USER_STATE: UserState = {
    currentPosition: {
        x: 0,
        y: 0,
    },
    desiredPosition: {
        x: 0,
        y: 0,
    },
    health: 5,
    animation: UserAnimation.STALE,
}

export interface Users {
    [userName: string]: UserState
}


export enum ReceivedMessageType {
    MOVE_POSITION,
}

export interface MovePositionData {
    position: Position
}

export interface ReceivedMessage {
    type: ReceivedMessageType,
    data: MovePositionData
}


declare module 'socket.io' {
    interface Socket {
        userId: string
    }
}