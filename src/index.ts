import Canvas from "./canvas";
import Layout from "./components/layout";
import Monster from "./components/monster";
import Player from "./components/player";


const player = new Player({})
const monster = new Monster()
const layout = new Layout()
const canvas = new Canvas([layout, monster, player]);
canvas.start();
