import * as http from "http";
import SocketIO from "socket.io";
import {v4 as uuidv4} from 'uuid';
import Room from "./room";
import {MovePositionData, ReceivedMessage, ReceivedMessageType} from "./type";

export default function init(server: http.Server) {
    const socketServer = new SocketIO.Server(server, {
        cors: {
            origin: '*',
        }
    })

    // Currently only support 1 room
    // TODO figure out how to make it multiple rooms
    const roomId = uuidv4()
    const room = new Room(roomId, socketServer);

    socketServer.use((socket, next) => {
        const userId = socket.handshake.auth.userId;
        if (!userId) {
            return next(new Error("invalid userId"))
        }
        socket.userId = userId;
        next();
    });

    socketServer.on('connection', (socket) => {
        console.log(`${socket.userId} connected`);
        room.addUser(socket.userId, socket);

        // Joining room for the user
        socket.join(roomId)

        socket.on('message', (message: ReceivedMessage) => {
            if (message.type === ReceivedMessageType.MOVE_POSITION) {
                const data = message.data as MovePositionData
                room.updatePlayerPosition(socket.userId, data.position)
            }
            socket.send("message received!")
        })

        socket.on('ping', (callback) => {
            callback()
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
            room.removeUser(socket.userId)
        });
    })
}