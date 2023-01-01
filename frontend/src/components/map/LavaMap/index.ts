import Phaser from "phaser";
import {GAME_HEIGHT, GAME_WIDTH} from "../../../constants";
import LavaMapImage from './lava-map.png'

export default class LavaMap extends Phaser.GameObjects.Container {
    static key = 'lava-map'
    static image = LavaMapImage

    private map: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0);
        this.scene.add.existing(this)
        this.map = this.scene.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, LavaMap.key)
        this.map.setScale(1.2)
        this.add([this.map])
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(LavaMap.key, LavaMap.image)
    }
}