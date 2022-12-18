import WarriorJson from './warrior_character.json'
import WarriorImage from './warrior_character.png'

export default class Warrior extends Phaser.GameObjects.Container {
    static key: string = 'warrior'
    static image: string = WarriorImage

    private sprite: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.scene.add.existing(this)

        const tags = this.scene.anims.createFromAseprite(Warrior.key)
        this.sprite = this.scene.add.sprite(0, 0, Warrior.key).play({key: 'idle', repeat: -1})
        this.sprite.setScale(2)

        this.add(this.sprite)
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.aseprite(Warrior.key, Warrior.image, WarriorJson)
    }

    move(direction: 'left' | 'right' | 'up' | 'down') {
        let newX = this.x
        let newY = this.y

        switch (direction) {
            case "left":
                newX -= 1;
                break
            case "right":
                newX += 1;
                break
            case "up":
                newY -= 1;
                break
            case "down":
                newY += 1
                break
        }

        this.setPosition(newX, newY)
    }
}