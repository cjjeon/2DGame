import SocketIO from "socket.io";
import {DEFAULT_USER_STATE, UserState} from "./type";

enum MESSAGE_STATE {
    SYNC = "SYNC"
}


interface RoomStorage {
    [id: string]: {
        socket: SocketIO.Socket
        userState: UserState
    } | undefined
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

        this.timer = setInterval(this.process.bind(this), 2000);
    }

    process() {
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
}

export default Room