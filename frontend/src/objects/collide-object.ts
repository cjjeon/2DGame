import {Dimension, Position} from "../type";
import DefaultObject, {DefaultObjectProps} from "./default-object";


export interface CollideObjectProps extends DefaultObjectProps {
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
    isCollide: boolean = false

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
}

export default CollideObject