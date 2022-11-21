import Component from "./component";
import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./constants";

class Canvas {
    canvas: HTMLCanvasElement = document.createElement('canvas')
    context: null | CanvasRenderingContext2D = null
    components: Component[] = []

    constructor(components: Component[]) {
        this.components = components
    }

    update() {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.components.forEach(component => component.render(this.context as CanvasRenderingContext2D))
        }
    }

    start() {
        this.canvas.className = 'canvas'
        this.canvas.width = CANVAS_WIDTH
        this.canvas.height = CANVAS_HEIGHT
        this.context = this.canvas.getContext('2d')
        if (this.context) this.context.imageSmoothingEnabled = false
        document.body.appendChild(this.canvas)
        setInterval(this.update.bind(this), 25)
    }

}

export default Canvas