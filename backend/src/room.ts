import SocketIO from "socket.io";
import {DEFAULT_USER_STATE, Position, UserAnimation, UserState} from "./type";

enum MESSAGE_STATE {
    SYNC = "SYNC"
}

interface UserStorage {
    socket: SocketIO.Socket
    userState: UserState
    isDeleted: boolean
}


interface RoomStorage {
    [id: string]: UserStorage | undefined
}


interface SyncState {
    players: {
        [id: string]: UserState
    }
}

function convertRoomStorageToSyncState(roomStorage: RoomStorage): SyncState {
    const syncState: SyncState = {
        players: {}
    }
    for (const id in roomStorage) {
        const userState = roomStorage[id]?.userState
        if (userState) {
            syncState.players[id] = userState
        }
    }
    return syncState
}

class Room {
    private roomId: string
    private socketServer: SocketIO.Server
    private timer: NodeJS.Timer
    private roomStorage: RoomStorage = {}

    constructor(roomId: string, socketServer: SocketIO.Server) {
        this.roomId = roomId
        this.socketServer = socketServer

        this.timer = setInterval(this.process.bind(this), 20);
    }

    runGameEngine() {
        Object.keys(this.roomStorage).forEach((id) => {
            if (this.roomStorage[id]) {
                const userStorage = this.roomStorage[id] as UserStorage
                userStorage.userState.animation = UserAnimation.STALE
                if (userStorage.userState.currentPosition.x > userStorage.userState.desiredPosition.x) {
                    userStorage.userState.currentPosition.x -= 1;
                    userStorage.userState.animation = UserAnimation.MOVING
                }
                if (userStorage.userState.currentPosition.x < userStorage.userState.desiredPosition.x) {
                    userStorage.userState.currentPosition.x += 1;
                    userStorage.userState.animation = UserAnimation.MOVING
                }

                if (userStorage.userState.currentPosition.y > userStorage.userState.desiredPosition.y) {
                    userStorage.userState.currentPosition.y -= 1;
                    userStorage.userState.animation = UserAnimation.MOVING
                }
                if (userStorage.userState.currentPosition.y < userStorage.userState.desiredPosition.y) {
                    userStorage.userState.currentPosition.y += 1;
                    userStorage.userState.animation = UserAnimation.MOVING
                }

                if (userStorage.isDeleted) {
                    this.roomStorage[id] = undefined
                }
            }
        })
    }

    process() {
        if (Object.keys(this.roomStorage).length === 0) return

        // process moving
        this.runGameEngine()

        // every 400ms send out everyone's state
        this.socketServer.to(this.roomId).emit(MESSAGE_STATE.SYNC, convertRoomStorageToSyncState(this.roomStorage))
    }

    addUser(id: string, socket: SocketIO.Socket) {
        // Should we care about the user is already in the room?
        // TODO maybe something to care about it. For now, I'm ignoring it
        if (this.roomStorage[id]) {
            console.error(`user (${id}) already in the room`);
            (this.roomStorage[id] as UserStorage).socket.disconnect();
        }

        this.roomStorage[id] = {
            socket,
            userState: DEFAULT_USER_STATE,
            isDeleted: false
        }
    }

    removeUser(id: string) {
        if (this.roomStorage[id]) {
            (this.roomStorage[id] as UserStorage).isDeleted = true
        }
    }

    updatePlayerPosition(id: string, position: Position) {
        if (this.roomStorage.hasOwnProperty(id) && this.roomStorage[id]) {
            // @ts-ignore
            this.roomStorage[id].userState.desiredPosition = position
        }
    }
}

export default Room