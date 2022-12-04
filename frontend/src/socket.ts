import {io} from "socket.io-client";
import Canvas from "./canvas";
import PlayerObject from "./objects/player-object";
import {Position, UserState} from "./type";

enum SendMessageType {
    MOUSE_CLICK,
}

enum MESSAGE_STATE {
    SYNC = "SYNC"
}

interface MouseClickData {
    position: Position
}


interface SendMessage {
    type: SendMessageType,
    data: MouseClickData
}


interface SyncState {
    players: {
        [id: string]: UserState
    }
}

function processSyncState(canvas: Canvas, syncState: SyncState) {
    for (const playerId in syncState.players) {
        const userState = syncState.players[playerId]
        const component = canvas.getComponent(playerId)
        if (component) {
            (component as PlayerObject).position = userState.currentPosition
        } else {
            canvas.addComponent(new PlayerObject({
                id: playerId,
                position: userState.currentPosition,
                dimension: {
                    width: 48,
                    height: 48,
                }
            }))
        }
    }
}


function init(canvas: Canvas) {
    const socket = io("ws://localhost:4001", {auth: {userId: 'Bobby'}})

    const element = document.createElement('div')
    document.body.appendChild(element)

    socket.on("connect_error", (err) => {
        // add some connection error
        if (err.message === "invalid username") {
            console.error("invalid username")
        }
    })

    document.addEventListener('mousedown', (event) => {
        const data: MouseClickData = {
            position: {
                x: event.clientX,
                y: event.clientY
            }
        }
        socket.send({type: SendMessageType.MOUSE_CLICK, data})
    })

    socket.on('message', (message) => {
        console.log("Message Recieved: ", message)
    })

    socket.on(MESSAGE_STATE.SYNC, (message) => {
        console.log(`sync data from server`)
        processSyncState(canvas, message)
    })

    setInterval(() => {
        const start = Date.now()
        if (socket.connected) {
            socket.emit('ping', () => {
                const duration = Date.now() - start;
                element.textContent = `ping: ${duration}ms`
            })
        }
    }, 1000)
}

export default init