export interface Position {
    x: number;
    y: number;
}

export interface Boss {
    health: number
    position: Position
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

export enum ActionType {
    MOVE = 'MOVE',
    CLICK_MOVE = 'CLICK_MOVE',
    SKILL_1 = 'SKILL_1'
}

export interface MoveData {
    directionY: 'up' | 'down' | null
    directionX: 'left' | 'right' | null
}

export interface ClickMoveData {
    x: number,
    y: number
}

export type ActionData = MoveData | ClickMoveData | null

export interface PlayerActionProp {
    actionType: ActionType,
    actionData: ActionData
}

export interface PlayerUpdateProp {
    player: Player,
    actionType: ActionType,
    actionData: ActionData
}