import WarriorImage from './warrior_character.png'

export default class Warrior extends Phaser.GameObjects.Container {
    static key: string = 'warrior'
    static image: string = WarriorImage

    private sprite: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        this.scene.add.existing(this)

        this.sprite = this.scene.add.sprite(0, 0, Warrior.key)
        this.add(this.sprite)
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.spritesheet(Warrior.key, Warrior.image, {frameWidth: 64, frameHeight: 64})
    }
}