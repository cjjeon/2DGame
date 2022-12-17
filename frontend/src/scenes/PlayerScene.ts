import Phaser from 'phaser'

export default class PlayerScene extends Phaser.Scene {
    static key: string = 'player-scene'

    constructor() {
        super(PlayerScene.key);
    }

}