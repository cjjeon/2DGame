// import Canvas from "./canvas";
// import init from "./socket";
//
// const canvas = new Canvas();
// canvas.start();
//
//
// init(canvas)


import Phaser from 'phaser'
import {GAME_HEIGHT, GAME_WIDTH} from "./constants";
import LoginScene from './scenes/LoginScene'
import PlayerScene from "./scenes/PlayerScene";

const game = new Phaser.Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
    },
    pixelArt: true,
    scene: [new LoginScene(), new PlayerScene()]
})