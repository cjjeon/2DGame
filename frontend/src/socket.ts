// import {io} from "socket.io-client";
// import Canvas from "./canvas";
// import {GRID_SCALE} from "./constants";
// import PlayerObject from "./objects/player-object";
// import {Position, UserState} from "./type";
//
// enum SendMessageType {
//     MOVE_POSITION,
// }
//
// interface MovePositionData {
//     position: Position
// }
//
// interface SendMessage {
//     type: SendMessageType,
//     data: MovePositionData
// }
//
// enum MESSAGE_STATE {
//     SYNC = "SYNC"
// }
//
// interface SyncState {
//     players: {
//         [id: string]: UserState
//     }
// }
//
// function processSyncState(canvas: Canvas, syncState: SyncState) {
//     for (const playerId in syncState.players) {
//         const userState = syncState.players[playerId]
//         const component = canvas.getComponent(playerId)
//         if (component) {
//             (component as PlayerObject).position = userState.currentPosition;
//             (component as PlayerObject).animate = userState.animation;
//         } else {
//             canvas.addComponent(new PlayerObject({
//                 id: playerId,
//                 position: userState.currentPosition,
//                 dimension: {
//                     width: 48,
//                     height: 48,
//                 },
//             }))
//         }
//     }
// }
//
//
// function init(canvas: Canvas) {
//     const socket = io("ws://localhost:4001", {auth: {userId: 'Bobby'}})
//
//     const element = document.createElement('div')
//     document.body.appendChild(element)
//
//     socket.on("connect_error", (err) => {
//         // add some connection error
//         if (err.message === "invalid username") {
//             console.error("invalid username")
//         }
//     })
//
//     document.addEventListener('mousedown', (event) => {
//         if (event.button === 2) {
//             // Right Click
//             const canvasRect = canvas.canvas.getBoundingClientRect()
//             const data: MovePositionData = {
//                 position: {
//                     x: Math.round((event.clientX - canvasRect.left) / GRID_SCALE),
//                     y: Math.round((event.clientY - canvasRect.top) / GRID_SCALE)
//                 }
//             }
//
//             socket.send({type: SendMessageType.MOVE_POSITION, data})
//         }
//     })
//
//     socket.on('message', (message) => {
//         console.log("Message Recieved: ", message)
//     })
//
//     socket.on(MESSAGE_STATE.SYNC, (message) => {
//         processSyncState(canvas, message)
//     })
//
//     setInterval(() => {
//         const start = Date.now()
//         if (socket.connected) {
//             socket.emit('ping', () => {
//                 const duration = Date.now() - start;
//                 element.textContent = `ping: ${duration}ms`
//             })
//         }
//     }, 1000)
//
// }
//
// export default init


import {io, Socket as IoSocket} from "socket.io-client";
import {ActionData, ActionType, Player, Room} from "./type";

enum SocketState {
    CONNECTED,
    CONNECTING,
    RECONNECTING,
    DISCONNECTED,
}

class Socket {
    public state: SocketState = SocketState.DISCONNECTED
    public ping: number = 0
    private socket: IoSocket

    constructor() {
        this.socket = io("ws://localhost:4001", {withCredentials: true, autoConnect: false})

        this.socket.on('connect', () => {
            console.log('socket is connected')
            this.state = SocketState.RECONNECTING

            setInterval(() => {
                const start = Date.now()
                if (this.socket.connected) {
                    this.socket.emit('ping', () => {
                        const duration = Date.now() - start;
                        this.ping = duration
                    })
                }
            }, 1000)
        })

        this.socket.on('reconnect', () => {
            console.log('socket is reconnecting')
            this.state = SocketState.RECONNECTING
        })

        this.socket.on('disconnect', () => {
            console.log('socket is disconnected')
            this.state = SocketState.DISCONNECTED
        })
    }

    connect() {
        this.socket.connect()
        this.state = SocketState.CONNECTING
    }

    joinRoom() {
        this.socket.emit('join_room')
    }

    onRoomJoin(callback: (room: Room) => void) {
        this.socket.on('join-room', callback)
    }

    onGameStart(callback: () => void) {
        this.socket.on('game-start', callback)
    }

    onPlayerJoin(callback: (player: Player) => void) {
        this.socket.on('new-player', callback)
    }

    onPlayerUpdate(callback: (player: Player, actionType: ActionType, actionData: ActionData) => void) {
        this.socket.on('player-update', callback)
    }

    onPlayerAction(actionType: ActionType, actionData: ActionData) {
        this.socket.emit('player-action', {
            actionType,
            actionData
        })
    }
}


export default new Socket()