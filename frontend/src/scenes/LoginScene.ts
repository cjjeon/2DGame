import Phaser from 'phaser';
import createUserWithoutSignup from "../api/create-user-without-signup";
import getUserByCookie from "../api/get-me";
import WideButton from "../components/buttons/WideButton";
import {GAME_HEIGHT, GAME_WIDTH} from "../constants";
import PlayerScene from "./PlayerScene";

export default class LoginScene extends Phaser.Scene {
    static key: string = 'login-screen'

    private wideButton: WideButton | undefined

    constructor() {
        super(LoginScene.key);
        getUserByCookie().then(user => {
            this.scene.start(PlayerScene.key)
        }).catch(() => null)
    }

    preload() {
        WideButton.load(this)
    }

    create() {
        this.wideButton = new WideButton(this, GAME_WIDTH / 2, GAME_HEIGHT / 2, 'Login')
        this.wideButton.on(Phaser.Input.Events.POINTER_UP, async () => {
            createUserWithoutSignup().then(user => {
                this.scene.start(PlayerScene.key)
            })
        })
    }

    update() {

    }
}