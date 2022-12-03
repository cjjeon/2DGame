import Canvas from "./canvas";
import {GAME_OBJECTS} from "./constants";
import init from "./socket";

const canvas = new Canvas(GAME_OBJECTS);
canvas.start();


init()