import Phaser from 'phaser'
import WideButton from "../components/buttons/WideButton";
import Warrior from "../components/character/Warrior";
import {USER} from "../constants";
import socket from "../socket";
import BossRoomScene from "./BossRoomScene";
import LoginScene from "./LoginScene";

export default class PlayerScene extends Phaser.Scene {
    static key: string = 'player-scene'

    private warrior: Warrior | undefined
    private button: WideButton | undefined

    constructor() {
        super(PlayerScene.key);
        socket.onDisconnect(() => {
            this.scene.start(LoginScene.key)
        })
    }

    create() {
        this.warrior = new Warrior(this, USER.id, 300, 400, 3)
        this.button = new WideButton(this, 1000, 400, 'Fight!')
            .on(Phaser.Input.Events.POINTER_UP, () => {
                socket.joinRoom()
                this.scene.start(BossRoomScene.key)
            })
    }

    update(time: number, delta: number) {
    }
}