import {io} from "socket.io-client";
import {Position} from "./type";

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

function init() {
    const socket = io("ws://localhost:4001", {auth: {userId: 'Bobby'}})

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
        console.log(`sync data from server: ${message}`)
    })
}

export default init