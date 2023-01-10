import {Position} from "../../../type";
import BlueLaser from "../../skills/BlueLaser";
import WarriorJson from './warrior_character.json'
import WarriorImage from './warrior_character.png'


export default class Warrior extends Phaser.GameObjects.Container {
    static key: string = 'warrior'
    static image: string = WarriorImage

    public userId: string
    public skill1: BlueLaser

    private sprite: Phaser.Physics.Arcade.Sprite
    private speed: number = 60;
    private moveToPosition: Position | null = null // Moving to specific position

    constructor(scene: Phaser.Scene, userId: string, x: number, y: number, scale: number = 1) {
        super(scene, x, y);
        this.userId = userId
        this.scene.add.existing(this)

        const tags = this.scene.anims.createFromAseprite(Warrior.key)

        this.sprite = this.scene.physics.add.sprite(0, 0, Warrior.key).play({key: 'warrior-idle', repeat: -1})
        this.sprite.setScale(scale)
        this.add(this.sprite)

        this.skill1 = new BlueLaser(scene, x, y)

        // Adding physics body to container
        this.scene.physics.world.enable(this);
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.aseprite(Warrior.key, Warrior.image, WarriorJson)
    }

    setSkillCollision(physics: Phaser.Physics.Arcade.ArcadePhysics, boss: Phaser.GameObjects.GameObject) {
        physics.add.collider(boss, this.skill1, (_boss, _skill) => {
            (_skill as BlueLaser).remove()
        })
    }

    setMovePosition(position: Position) {
        this.moveToPosition = position
    }

    update() {
        if (this.moveToPosition) {
            let dx = this.moveToPosition.x - this.x
            let dy = this.moveToPosition.y - this.y

            if (Math.abs(dx) < 10) {
                dx = 0
            }
            if (Math.abs(dy) < 10) {
                dy = 0
            }

            this.move(dx, dy)
        }

        this.skill1.update()
    }

    move(dx: number, dy: number) {
        if (dx === 0 && dy === 0) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocity(0, 0)
            this.sprite.play('warrior-idle', true)
            this.moveToPosition = null
            return
        }

        if (dx < 0) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(-1 * this.speed)
            this.sprite.setFlipX(true)
        } else if (dx > 0) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityX(this.speed)
            this.sprite.setFlipX(false)
        }

        if (dy < 0) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(-1 * this.speed)
        } else if (dy > 0) {
            (this.body as Phaser.Physics.Arcade.Body).setVelocityY(this.speed)
        }

        this.sprite.play('warrior-walking', true)
    }

    skill() {
        this.skill1.shoot({x: this.x, y: this.y}, {x: 1, y: -1})
    }
}