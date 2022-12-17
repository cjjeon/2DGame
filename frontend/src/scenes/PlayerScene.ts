import Phaser from 'phaser'
import Warrior from "../components/character/Warrior";

export default class PlayerScene extends Phaser.Scene {
    static key: string = 'player-scene'

    private warrior: Warrior | undefined

    constructor() {
        super(PlayerScene.key);
    }

    preload() {
        Warrior.load(this)
    }

    create() {
        this.warrior = new Warrior(this, 300, 400)
    }
}