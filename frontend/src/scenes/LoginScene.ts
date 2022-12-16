import Phaser from 'phaser';
import WideButton from "../buttons/WideButton";

export default class LoginScene extends Phaser.Scene {
    private wideButton: WideButton | undefined

    constructor() {
        super('login-scene');
    }

    preload() {
        WideButton.load(this)
    }

    create() {
        this.wideButton = new WideButton(this, 400, 300, 'Login')
    }

    update() {

    }
}