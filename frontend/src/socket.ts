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