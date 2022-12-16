import Phaser from 'phaser';
import WideButton from "../buttons/WideButton";

export default class LoginScene extends Phaser.Scene {
    private button: WideButton | undefined

    constructor() {
        super('login-scene');
    }

    preload() {
        WideButton.load(this)
    }

    create() {
        this.button = new WideButton(this, 200, 50)
    }

    update() {

    }
}