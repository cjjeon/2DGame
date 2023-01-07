import Phaser from 'phaser'
import {GAME_HEIGHT, GAME_WIDTH} from "./constants";
import BossRoomScene from "./scenes/BossRoomScene";
import LoginScene from "./scenes/LoginScene";
import PlayerScene from "./scenes/PlayerScene";
import Preloader from "./scenes/Preloader";

const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    },
    physics: {
        default: 'arcade',
        arcade: {}
    },
    pixelArt: true,
    scene: [
        // TestScene,
        Preloader,
        LoginScene,
        PlayerScene,
        BossRoomScene
    ]
})
