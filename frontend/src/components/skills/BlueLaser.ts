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
        this.visible = false;
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true)
    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(BlueLaser.key, BlueLaser.image)
    }

    setShootingTowards(position: Position) {
        this.shootingTowards = position
    }

    remove() {
        this.x = -20;
        this.y = -20;
        this.visible = false;
    }

    shoot(fromPosition: Position, toPosition: Position) {
        this.x = fromPosition.x
        this.y = fromPosition.y
        this.visible = true
        this.setShootingTowards(toPosition)
    }

    update() {
        if (this.visible) {
            this.x += this.shootingTowards.x * this.speed
            this.y += this.shootingTowards.y * this.speed
        }
    }
}