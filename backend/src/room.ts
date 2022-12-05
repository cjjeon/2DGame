import SocketIO from "socket.io";
import {DEFAULT_USER_STATE, Position, UserState} from "./type";

enum MESSAGE_STATE {
    SYNC = "SYNC"
}

interface UserStorage {
    socket: SocketIO.Socket
    userState: UserState
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

    engine() {
        Object.keys(this.roomStorage).forEach((id) => {
            const userStorage = this.roomStorage[id] as UserStorage
            if (userStorage.userState.currentPosition.x > userStorage.userState.desiredPosition.x) {
                userStorage.userState.currentPosition.x -= 1;
            }
            if (userStorage.userState.currentPosition.x < userStorage.userState.desiredPosition.x) {
                userStorage.userState.currentPosition.x += 1;
            }

            if (userStorage.userState.currentPosition.y > userStorage.userState.desiredPosition.y) {
                userStorage.userState.currentPosition.y -= 1;
            }
            if (userStorage.userState.currentPosition.y < userStorage.userState.desiredPosition.y) {
                userStorage.userState.currentPosition.y += 1;
            }
        })
        console.log(this.roomStorage["Bobby"]?.userState.desiredPosition)
    }

    process() {
        // process moving
        this.engine()

        // every 400ms send out everyone's state
        console.debug(`Sending SYNC Message to room ${this.roomId}`)
        this.socketServer.to(this.roomId).emit(MESSAGE_STATE.SYNC, convertRoomStorageToSyncState(this.roomStorage))
    }

    addUser(id: string, socket: SocketIO.Socket) {
        // Should we care about the user is already in the room?
        // TODO maybe something to care about it. For now, I'm ignoring it
        if (id in this.roomStorage) throw new Error(`user (${id}) already in the room`);

        this.roomStorage[id] = {
            socket,
            userState: DEFAULT_USER_STATE
        }
    }

    removeUser(id: string) {
        this.roomStorage[id] = undefined
    }

    updatePlayerPosition(id: string, position: Position) {
        if (this.roomStorage.hasOwnProperty(id) && this.roomStorage[id]) {
            // @ts-ignore
            this.roomStorage[id].userState.desiredPosition = position
        }
    }
}

export default Room