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
        let direction: 'left' | 'right' | 'up' | 'down' | null = null

        if (this.cursors?.left.isDown) {
            direction = 'left'
        } else if (this.cursors?.right.isDown) {
            direction = 'right'
        } else if (this.cursors?.up.isDown) {
            direction = 'up'
        } else if (this.cursors?.down.isDown) {
            direction = 'down'
        }
        this.warrior?.move(direction)
    }
}