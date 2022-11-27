import Slime from '../assets/slime.png'
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../constants";
import {Position} from "../type";
import CollideObject, {CollideObjectProps} from "./collide-object";

interface MonsterObjectProps extends CollideObjectProps {
    position: Position,
    sourceImgPosition: Position
    scale: number
    image: HTMLImageElement
}

class MonsterObject extends CollideObject implements MonsterObjectProps {
    position = {
        x: CANVAS_WIDTH / 2,
        y: CANVAS_HEIGHT / 2
    }
    sourceImgPosition = {
        x: 0,
        y: 0,
    }
    scale = 5
    image = new Image()

    constructor(props: Partial<MonsterObjectProps>) {
        super(props)
        Object.assign(this, props)
        
        this.image.src = Slime
    }


    updateFrame() {
        this.sourceImgPosition.x += 32
        if (this.sourceImgPosition.x >= 32 * 4) {
            this.sourceImgPosition.x = 0
        }
    }

    getImageRow() {
        return 0
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.image,
            this.sourceImgPosition.x,
            this.getImageRow(),
            32,
            32,
            this.position.x,
            this.position.y,
            32 * this.scale,
            32 * this.scale,
        )
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height)
        context.stroke();
        this.updateFrame()
    }
}

export default MonsterObject