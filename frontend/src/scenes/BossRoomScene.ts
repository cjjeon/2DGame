import Phaser from 'phaser'
import Warrior from "../components/character/Warrior";
import socket from "../socket";
import {Player, Room} from "../type";

export default class BossRoomScene extends Phaser.Scene {
    static key: string = 'boss-room-scene'

    private players: Warrior[] = []

    constructor() {
        super(BossRoomScene.key);
        socket.onPlayerJoin(this.addPlayer.bind(this))
        socket.onRoomJoin(this.joinRoom.bind(this))
    }

    preload() {
    }

    create() {
    }

    update(time: number, delta: number) {
    }

    joinRoom(room: Room) {
        console.log('join room')
        // add player
        room.players.forEach((player) => {
            this.addPlayer(player)
        })
    }

    addPlayer(player: Player) {
        const warrior = new Warrior(this, player.position.x, player.position.y, player.username, 1)
        this.players.push(warrior)
    }
}