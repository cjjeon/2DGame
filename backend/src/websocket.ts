import cookie from 'cookie'
import * as http from "http";
import SocketIO from "socket.io";
import auth from "./auth";
import {User} from "./database/models";
import errors from "./errors";
import RoomsController from "./rooms-controller";
import {ActionData} from "./type";

export default function init(server: http.Server) {
    const socketServer = new SocketIO.Server(server, {
        cors: {
            origin: ['http://localhost:4000'],
            allowedHeaders: ['Access-Control-Allow-Credentials'],
            credentials: true,
        },
    })

    const roomController = new RoomsController(socketServer)

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
        const user = socket.user
        socket.on('join_room', async () => {
            const {room, player} = await roomController.joinRoomForPlayer(user);
            user.roomId = room.id
            await user.save()

            // Send Room information to the new user
            socket.emit('join-room', room);
            // Send New Player to server
            socketServer.to(room.id).emit('new-player', player);

            // Add the player to socket room
            socket.join(room.id);
        })

        socket.on('player-action', (actionData: ActionData) => {
            console.log(user.roomId, actionData)

            const room = roomController.getRoom(user.roomId)

        })

        socket.on('ping', (callback) => {
            callback()
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    })
}