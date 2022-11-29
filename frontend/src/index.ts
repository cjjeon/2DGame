import io from 'socket.io-client'
import Canvas from "./canvas";
import {GAME_OBJECTS} from "./constants";

const canvas = new Canvas(GAME_OBJECTS);
canvas.start();


const socket = io("ws://localhost:4001")

document.addEventListener('mousedown', () => {
    console.log('sending message')
    socket.send('adding message')
})

socket.on('message', (message) => {
    console.log("Message Recieved: ", message)
})