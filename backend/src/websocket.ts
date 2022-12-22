import cookie from 'cookie'
import * as http from "http";
import SocketIO from "socket.io";
import {v4 as uuidv4} from 'uuid';
import auth from "./auth";
import {User} from "./database/models";
import errors from "./errors";
import Room from "./room";
import {MovePositionData, ReceivedMessage, ReceivedMessageType} from "./type";

export default function init(server: http.Server) {
    const socketServer = new SocketIO.Server(server, {
        cors: {
            origin: ['http://localhost:4000'],
            allowedHeaders: ['Access-Control-Allow-Credentials'],
            credentials: true,
        },
    })

    // Currently only support 1 room
    // TODO figure out how to make it multiple rooms
    const roomId = uuidv4()
    const room = new Room(roomId, socketServer);

    socketServer.use(async (socket, next) => {
        const cookies = cookie.parse(socket.request.headers.cookie || '');
        if (!cookies) {
            throw new errors.AuthenticationError()
        }
        const token = cookies.access_token;
        if (!token) {
            throw new errors.AuthenticationError()
        }
        const userToken = auth.verifyToken(token)
        const user = await User.findOne({where: {id: userToken.id}})
        if (!user) {
            throw new errors.AuthenticationError()
        }
        socket.user = user
        next()
    });

    socketServer.on('connection', (socket) => {
        if (!socket.user) {
            throw new errors.AuthenticationError()
        }
        console.log(`${socket.user.username} connected`);

        room.addUser(socket.user.id, socket);

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