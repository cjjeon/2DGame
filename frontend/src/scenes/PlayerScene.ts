import Phaser from 'phaser'
import Warrior from "../components/character/Warrior";

export default class PlayerScene extends Phaser.Scene {
    static key: string = 'player-scene'

    private warrior: Warrior | undefined
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined

    constructor() {
        super(PlayerScene.key);
    }

    preload() {
        Warrior.load(this)
    }

    create() {
        this.warrior = new Warrior(this, 300, 400)
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update(time: number, delta: number) {
        if (this.cursors?.left.isDown) {
            this.warrior?.move('left')
        }

        if (this.cursors?.right.isDown) {
            this.warrior?.move('right')
        }

        if (this.cursors?.up.isDown) {
            this.warrior?.move('up')
        }

        if (this.cursors?.down.isDown) {
            this.warrior?.move('down')
        }
    }
}