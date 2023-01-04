import WarriorJson from './warrior_character.json'
import WarriorImage from './warrior_character.png'

export default class Warrior extends Phaser.GameObjects.Container {
    static key: string = 'warrior'
    static image: string = WarriorImage

    private username: Phaser.GameObjects.Text
    private sprite: Phaser.Physics.Arcade.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number, username: string, scale: number = 1) {
        super(scene, x, y);
        this.scene.add.existing(this)

        const tags = this.scene.anims.createFromAseprite(Warrior.key)

        this.sprite = this.scene.physics.add.sprite(0, 0, Warrior.key).play({key: 'warrior-idle', repeat: -1})
        this.sprite.setScale(scale)
        this.add(this.sprite)

        this.username = this.scene.add.text(-1 * this.sprite.displayWidth / 2, this.sprite.displayHeight / 2, username)
        this.username.setScale(scale)
        this.add(this.username)
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.aseprite(Warrior.key, Warrior.image, WarriorJson)
    }

    move(direction: 'left' | 'right' | 'up' | 'down' | null) {
        switch (direction) {
            case "left":
                this.sprite.setVelocityX(-60).setFlipX(true).play('warrior-walking', true)
                break
            case "right":
                this.sprite.setVelocityX(60).setFlipX(false).play('warrior-walking', true)
                this.sprite.play('warrior-walking', true)
                break
            case "up":
                this.sprite.setVelocityY(-60)
                this.sprite.play('warrior-walking', true)
                break
            case "down":
                this.sprite.setVelocityY(60)
                this.sprite.play('warrior-walking', true)
                break
            default:
                this.sprite.setVelocity(0, 0)
                this.sprite.play('warrior-idle', true)
                break
        }
    }
}