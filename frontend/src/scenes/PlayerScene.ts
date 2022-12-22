import Phaser from 'phaser'
import WideButton from "../components/buttons/WideButton";
import Warrior from "../components/character/Warrior";
import BossRoomScene from "./BossRoomScene";

export default class PlayerScene extends Phaser.Scene {
    static key: string = 'player-scene'

    private warrior: Warrior | undefined
    private button: WideButton | undefined

    constructor() {
        super(PlayerScene.key);
    }

    preload() {
        Warrior.load(this)
        WideButton.load(this)
    }

    create() {
        this.warrior = new Warrior(this, 300, 400, 4)
        this.button = new WideButton(this, 1000, 400, 'Fight!')
            .on(Phaser.Input.Events.POINTER_UP, () => {
                this.scene.start(BossRoomScene.key)
            })
    }

    update(time: number, delta: number) {
    }
}