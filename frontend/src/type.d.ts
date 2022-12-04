export interface Position {
    x: number;
    y: number;
}

export interface Dimension {
    width: number;
    height: number;
}

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
