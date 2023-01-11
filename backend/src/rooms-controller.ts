import SocketIO from "socket.io";
import {Room as DbRoom, User} from "./database/models";
import {Player, Position, Room, RoomStatus, Skill} from "./type";


interface Rooms {
    [id: string]: Room
}

class RoomsController {
    private rooms: Rooms
    private socketServer: SocketIO.Server

    constructor(socketServer: SocketIO.Server) {
        this.rooms = {}
        this.socketServer = socketServer

        setInterval(this.runGameServer.bind(this), 1000)
    }


    runGameServer() {
        console.log(`Running Gamer Servers for ${Object.keys(this.rooms).length} rooms`)
        for (const roomId of Object.keys(this.rooms)) {
            const room = this.rooms[roomId]
            if (room.status === RoomStatus.WAITING && room.players.length >= 1) {
                console.log("Game Start!")
                room.status = RoomStatus.STARTED
                this.socketServer.to(room.id).emit('game-start')
            }
        }
    }

    updatePlayerPosition(roomId: string, userId: string, position: Position): Player | null {
        if (!(roomId in this.rooms)) return null
        const room = this.rooms[roomId]
        const player = room.players.find(player => player.userId === userId)
        if (!player) return null

        player.position = position

        return player
    }

    createPlayerSkill(roomId: string, userId: string): Skill | null {
        if (!(roomId in this.rooms)) return null
        const room = this.rooms[roomId]
        const player = room.players.find(player => player.userId === userId)
        if (!player) return null

        const playerPosition = player.position
        const bossPosition = room.boss.position

        const skill: Skill = {
            damage: 1,
            position: player.position,
            direction: {
                slope: (bossPosition.y - playerPosition.y) / (bossPosition.x - playerPosition.x),
                xDirection: (bossPosition.x - playerPosition.x) > 0 ? 1 : -1
            }
        }

        room.playerSkills.push(skill)

        return skill
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
                return {room, player}
            }
        }

        // Otherwise, create a room
        const dbRoom = await DbRoom.create({isComplete: false})

        const room: Room = {
            id: dbRoom.id,
            players: [player],
            playerSkills: [],
            boss: {
                health: 100,
                position: {
                    x: 320 * 2,
                    y: 180
                }
            },
            status: RoomStatus.WAITING,
        }
        this.rooms[dbRoom.id] = room
        return {room, player}
    }

}


export default RoomsController