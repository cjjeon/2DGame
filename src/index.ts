import Canvas from "./canvas";
import Layout from "./components/layout";
import Player from "./components/player";


const player = new Player({})
const layout = new Layout()
const canvas = new Canvas([layout, player]);
canvas.start();
