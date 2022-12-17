import Phaser from 'phaser'

import ButtonImage from './image.png'
import Color = Phaser.Display.Color;

export default class WideButton extends Phaser.GameObjects.Container {
    static key = "wide-button"
    static image = ButtonImage

    private text: Phaser.GameObjects.Text
    private buttonImage: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        super(scene, x, y)
        this.scene.add.existing(this)

        this.buttonImage = this.scene.add.image(0, 0, WideButton.key)
        this.text = this.scene.add.text(0, 0, text)

        this.buttonImage.setScale(0.8, 0.5)
        this.text.setOrigin(0.48, 0.66)

        this.add([this.buttonImage, this.text])
        this.setSize(this.buttonImage.displayWidth, this.buttonImage.displayHeight)
        this.setInteractive()
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.buttonImage.setTint(Color.HexStringToColor("#5893b7").color)
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.buttonImage.clearTint()
            })
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(WideButton.key, WideButton.image)
    }
}