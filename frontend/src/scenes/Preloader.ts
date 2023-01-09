import Phaser from 'phaser'
import WideButton from "../components/buttons/WideButton";
import Warrior from "../components/character/Warrior";
import LavaMap from "../components/map/LavaMap";
import Orc from "../components/monster/Orc";
import BlueLaser from "../components/skills/BlueLaser";
import LoginScene from "./LoginScene";

export default class Preloader extends Phaser.Scene {
    static key: string = 'pre-loader'

    constructor() {
        super(Preloader.key);
    }

    preload() {
        WideButton.load(this)
        Warrior.load(this)
        LavaMap.load(this)
        Orc.load(this)
        BlueLaser.load(this)
    }

    create() {
        this.scene.start(LoginScene.key)
    }
}