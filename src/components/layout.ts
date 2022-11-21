import Component from "../component";
import {Position} from "./type";

class Layout extends Component {
    drawLine(context: CanvasRenderingContext2D, from: Position, to: Position) {
        context.beginPath();
        context.moveTo(from.x, from.y)
        context.lineTo(to.x, to.y)
        context.strokeStyle = 'lightgray';
        context.stroke();
    }

    render(context: CanvasRenderingContext2D) {
        for (let i = 0; i < 720; i = i + 10) {
            this.drawLine(context, {x: 0, y: i}, {x: 1280, y: i})
        }

        for (let i = 0; i < 1280; i = i + 10) {
            this.drawLine(context, {x: i, y: 0}, {x: i, y: 720})
        }
    }
}

export default Layout