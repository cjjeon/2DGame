import Phaser from 'phaser';
import WideButton from "../components/buttons/WideButton";
import {GAME_HEIGHT, GAME_WIDTH} from "../constants";
import cookie from "../cookie";

export default class LoginScene extends Phaser.Scene {
    static key: string = 'login-screen'

    private wideButton: WideButton | undefined

    constructor() {
        super(LoginScene.key);
    }

    preload() {
        WideButton.load(this)
    }

    create() {
        this.wideButton = new WideButton(this, GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Login')
        this.wideButton.on(Phaser.Input.Events.POINTER_UP, () => {
            fetch('http://localhost:4001/create-user-without-signup', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'cookie': cookie.getFootprintCookie()
                })
            })
        })
    }

    update() {

    }
}