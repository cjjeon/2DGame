import SocketIO from "socket.io";
import {DEFAULT_USER_STATE, UserState} from "./type";

enum MESSAGE_STATE {
    SYNC = "SYNC"
}


interface UserStorage {
    [id: string]: UserState | null
}

class Room {
    private roomId: string
    private socketServer: SocketIO.Server
    private timer: NodeJS.Timer
    private userStorage: UserStorage = {}

    constructor(roomId: string, socketServer: SocketIO.Server) {
        this.roomId = roomId
        this.socketServer = socketServer

        this.timer = setInterval(this.process.bind(this), 2000);
    }

    process() {
        // every 400ms send out everyone's state
        console.debug(`Sending SYNC Message to room ${this.roomId}`)
        this.socketServer.to(this.roomId).emit(MESSAGE_STATE.SYNC, this.userStorage)
    }

    addUser(id: string) {
        // Should we care about the user is already in the room?
        // TODO maybe something to care about it. For now, I'm ignoring it
        if (id in this.userStorage) throw new Error(`user (${id}) already in the room`);

        this.userStorage[id] = DEFAULT_USER_STATE
    }

    removeUser(id: string) {
        this.userStorage[id] = null
    }
}

export default Room