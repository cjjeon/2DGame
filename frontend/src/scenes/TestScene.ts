import Phaser from 'phaser'
import WideButton from "../components/buttons/WideButton";
import Warrior from "../components/character/Warrior";
import Orc from "../components/monster/Orc";

export default class TestScene extends Phaser.Scene {
    static key: string = 'test-scene'

    private warrior?: Warrior
    private orc?: Orc
    private button?: WideButton

    constructor() {
        super(TestScene.key);
    }

    preload() {
        WideButton.load(this)
        Orc.load(this)
        Warrior.load(this)
    }

    create() {
        this.orc = new Orc(this, 400, 300, 4)
        this.warrior = new Warrior(this, 300, 400, 'asd', 1)
        this.button = new WideButton(this, 1000, 400, 'Fight!')
    }

    update(time: number, delta: number) {
    }
}