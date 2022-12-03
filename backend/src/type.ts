export enum UserAnimation {
    STALE,
    MOVING,
}

export interface UserState {
    currentPosition: {
        x: number,
        y: number,
    },
    desiredPosition: {
        x: number,
        y: number,
    },
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


declare module 'socket.io' {
    interface Socket {
        userId: string
    }
}