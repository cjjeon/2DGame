import Phaser from 'phaser'

import ButtonImage from './image.png'

export default class WideButton {
    static key = "wide-button"
    static image = ButtonImage

    private scene: Phaser.Scene
    private x: number
    private y: number

    private container: Phaser.GameObjects.Container
    private buttonImage: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene
        this.x = x
        this.y = y
        this.buttonImage = this.scene.add.image(0, 0, WideButton.key)
        this.container = this.scene.add.container(this.x, this.y, [this.buttonImage])

        this.container.setSize(this.buttonImage.width, this.buttonImage.height)
        this.container.setScale(5)

        this.container.setInteractive()
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.buttonImage.setTint(0x44ff44)
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.buttonImage.clearTint()
            })
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(WideButton.key, WideButton.image)
    }
}