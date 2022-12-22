import WarriorJson from './warrior_character.json'
import WarriorImage from './warrior_character.png'

export default class Warrior extends Phaser.GameObjects.Container {
    static key: string = 'warrior'
    static image: string = WarriorImage

    private sprite: Phaser.Physics.Arcade.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number = 1) {
        super(scene, x, y);
        this.scene.add.existing(this)

        const tags = this.scene.anims.createFromAseprite(Warrior.key)
        this.sprite = this.scene.physics.add.sprite(0, 0, Warrior.key).play({key: 'idle', repeat: -1})
        this.sprite.setScale(scale)

        this.add(this.sprite)
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.aseprite(Warrior.key, Warrior.image, WarriorJson)
    }

    move(direction: 'left' | 'right' | 'up' | 'down' | null) {
        switch (direction) {
            case "left":
                this.sprite.setVelocityX(-60).setFlipX(true).play('walking', true)
                break
            case "right":
                this.sprite.setVelocityX(60).setFlipX(false).play('walking', true)
                this.sprite.play('walking', true)
                break
            case "up":
                this.sprite.setVelocityY(-60)
                this.sprite.play('walking', true)
                break
            case "down":
                this.sprite.setVelocityY(60)
                this.sprite.play('walking', true)
                break
            default:
                this.sprite.setVelocity(0, 0)
                this.sprite.play('idle', true)
                break
        }
    }
}