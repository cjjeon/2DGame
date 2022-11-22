import Slime from '../assets/slime.png'
import Component from "../component";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "../constants";
import {Position} from "./type";

interface State {
    position: Position,
    sourceImgPosition: Position
    scale: number
}

class Monster extends Component {
    state: State = {
        position: {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2
        },
        sourceImgPosition: {
            x: 0,
            y: 0,
        },
        scale: 5
    }
    private image: HTMLImageElement

    constructor() {
        super()
        this.image = new Image()
        this.image.src = Slime
    }


    updateFrame() {
        this.state.sourceImgPosition.x += 32
        if (this.state.sourceImgPosition.x >= 32 * 4) {
            this.state.sourceImgPosition.x = 0
        }
    }

    getImageRow() {
        return 0
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.image,
            this.state.sourceImgPosition.x,
            this.getImageRow(),
            32,
            32,
            this.state.position.x,
            this.state.position.y,
            32 * this.state.scale,
            32 * this.state.scale,
        )
        this.updateFrame()
    }
}

export default Monster