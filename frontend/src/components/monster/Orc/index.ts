import OrcJson from './orc.json'
import OrcImage from './orc.png'


export default class Orc extends Phaser.GameObjects.Container {
    static key: string = 'orc'
    static image: string = OrcImage

    private sprite: Phaser.Physics.Arcade.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number, scale: number = 1) {
        super(scene, x, y);
        this.scene.add.existing(this)

        const tags = this.scene.anims.createFromAseprite(Orc.key)

        this.sprite = this.scene.physics.add.sprite(0, 0, Orc.key).play({key: `orc-idle`, repeat: -1})
        this.sprite.setScale(scale)
        this.add(this.sprite)
        
        this.scene.physics.world.enable(this);
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.aseprite(Orc.key, Orc.image, OrcJson)
    }
}