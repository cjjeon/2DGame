// import Canvas from "./canvas";
// import init from "./socket";
//
// const canvas = new Canvas();
// canvas.start();
//
//
// init(canvas)


import Phaser from 'phaser'
import LoginScene from './scenes/LoginScene'

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    scene: [new LoginScene()]
})