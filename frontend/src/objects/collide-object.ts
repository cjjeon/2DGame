import {GAME_OBJECTS} from "../constants";
import {Dimension, Position} from "../type";
import DefaultObject from "./default-object";


export interface CollideObjectProps {
    position: Position
    dimension: Dimension
    scale: number
}


class CollideObject extends DefaultObject implements CollideObjectProps {
    position = {
        x: 0,
        y: 0,
    }
    dimension = {
        width: 16,
        height: 16
    }
    scale = 1

    constructor(props: Partial<CollideObjectProps>) {
        super(props);
        Object.assign(this, props)
    }

    get width() {
        return this.dimension.width * this.scale
    }

    get height() {
        return this.dimension.height * this.scale
    }

    detectCollision(): CollideObject[] {
        const collidingObject: CollideObject[] = []

        
        for (const object of GAME_OBJECTS) {
            if (object instanceof CollideObject && object !== this) {
                if (
                    this.position.x <= object.position.x + object.width &&
                    object.position.x <= this.position.x + this.width &&
                    this.position.y <= object.position.y + object.height &&
                    object.position.y <= this.position.y + this.height
                ) {
                    collidingObject.push(object)
                }
            }
        }
        return collidingObject
    }
}

export default CollideObject