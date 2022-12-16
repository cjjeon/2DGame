import Phaser from 'phaser'
import {DEBUG} from "../../constants";

import ButtonImage from './image.png'

export default class WideButton {
    static key = "wide-button"
    static image = ButtonImage

    private scene: Phaser.Scene
    private x: number
    private y: number

    private container: Phaser.GameObjects.Container
    private text: Phaser.GameObjects.Text
    private buttonImage: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: number, y: number, text: string) {
        this.scene = scene
        this.x = x
        this.y = y
        this.buttonImage = this.scene.add.image(0, 0, WideButton.key)
        this.text = this.scene.add.text(0, 0, text)
        this.container = this.scene.add.container(this.x, this.y, [this.buttonImage, this.text])

        this.buttonImage.setScale(0.8)
        this.text.setOrigin(0.48, 0.66)

        this.container.setSize(this.buttonImage.displayWidth, this.buttonImage.displayHeight)

        this.container.setInteractive()
            .on(Phaser.Input.Events.POINTER_OVER, () => {
                this.buttonImage.setTint(0xf2ae61)
            })
            .on(Phaser.Input.Events.POINTER_OUT, () => {
                this.buttonImage.clearTint()
            })


        //  Just to display the hit area, not actually needed to work
        if (DEBUG) {
            const graphics = this.scene.add.graphics();
            graphics.lineStyle(2, 0x00ffff, 1);
            const width = this.container.width + 10
            const height = this.container.height + 10
            graphics.strokeRect(this.container.x - (width / 2), this.container.y - (height / 2), width, height);
        }
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(WideButton.key, WideButton.image)
    }
}