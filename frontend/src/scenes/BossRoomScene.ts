import Phaser from 'phaser'
import {io} from "socket.io-client"

export default class BossRoomScene extends Phaser.Scene {
    static key: string = 'boss-room-scene'

    constructor() {
        super(BossRoomScene.key);
    }

    preload() {
    }

    create() {
        const text = this.add.text(900, 10, "Boss Room Started", {color: '#fff'})
        text.setScale(2)


        const socket = io("ws://localhost:4001", {withCredentials: true})
    }

    update(time: number, delta: number) {
    }
}