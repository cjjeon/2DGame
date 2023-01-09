import Phaser from 'phaser';
import {Position} from "../../type";

import BlueLaserImage from './blue-laser.png'

export default class BlueLaser extends Phaser.Physics.Arcade.Sprite {
    static key = 'blue-laser'
    static image = BlueLaserImage

    private shootingTowards: Position = {
        x: 0,
        y: 0
    }
    private speed = 5;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, BlueLaser.key);
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(BlueLaser.key, BlueLaser.image)
    }

    setShootingTowards(position: Position) {
        this.shootingTowards = position
    }

    update() {
        if (this.visible) {
            this.x += this.shootingTowards.x * this.speed
            this.y += this.shootingTowards.y * this.speed
        }
    }
}