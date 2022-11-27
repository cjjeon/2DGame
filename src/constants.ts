import DefaultObject from "./objects/default-object";
import MonsterObject from "./objects/monster-object";
import PlayerObject from "./objects/player-object";

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

export const GAME_OBJECTS: DefaultObject[] = [
    new PlayerObject({
        dimension: {
            width: 48,
            height: 48,
        }
    }),
    new MonsterObject({
        dimension: {
            width: 32,
            height: 32,
        }
    })
];