import Phaser from 'phaser';
import {Direction, Position} from "../../type";

import BlueLaserImage from './blue-laser.png'

export default class BlueLaser extends Phaser.Physics.Arcade.Sprite {
    static key = 'blue-laser'
    static image = BlueLaserImage

    private direction: Direction
    private speed = 60;

    constructor(scene: Phaser.Scene, position: Position, direction: Direction) {
        super(scene, position.x, position.y, BlueLaser.key);
        this.direction = direction
        this.scene.add.existing(this)
        this.scene.physics.world.enable(this);

    }

    static load = (scene: Phaser.Scene) => {
        scene.load.image(BlueLaser.key, BlueLaser.image)
    }

    move() {
        this.setVelocity(this.direction.xDirection * this.speed, this.direction.xDirection * this.speed * this.direction.slope)
    }

    collide() {
        this.destroy()
    }
}