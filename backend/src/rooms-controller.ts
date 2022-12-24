import SocketIO from "socket.io";
import {Room as DbRoom, User} from "./database/models";
import {Player, Room, RoomStatus} from "./type";


interface Rooms {
    [id: string]: Room
}

class RoomsController {
    private rooms: Rooms
    private socketServer: SocketIO.Server

    constructor(socketServer: SocketIO.Server) {
        this.rooms = {}
        this.socketServer = socketServer
    }

    async joinRoomForPlayer(user: User): Promise<{ room: Room, player: Player }> {
        const player: Player = {
            userId: user.id,
            username: user.username,
            health: 100,
            position: {
                x: 320,
                y: 180 * 2,
            }
        }
        // Search for room to join
        for (const roomId of Object.keys(this.rooms)) {
            const room = this.rooms[roomId]
            if (room.players.length < 3 && room.status === RoomStatus.WAITING) {
                // join a room that has less than 3 players

                if (room.players.length === 1) {
                    player.position = {
                        x: 320 * 2,
                        y: 180 * 3
                    }
                } else {
                    player.position = {
                        x: 320 * 3,
                        y: 180 * 2
                    }
                }

                room.players.push(player)
                room.status = room.players.length === 3 ? RoomStatus.STARTED : RoomStatus.WAITING
                return {room, player}
            }
        }

        // Otherwise, create a room
        const dbRoom = await DbRoom.create({isComplete: false})
        user.roomId = dbRoom.id
        user.save()

        const room: Room = {
            id: dbRoom.id,
            players: [player],
            boss: {
                health: 100,
            },
            status: RoomStatus.WAITING,
        }
        this.rooms[dbRoom.id] = room
        return {room, player}
    }
}


export default RoomsController