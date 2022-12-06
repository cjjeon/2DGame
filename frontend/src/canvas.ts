import {CANVAS_HEIGHT, CANVAS_WIDTH, GRID_SCALE} from "./constants";
import CollideObject from "./objects/collide-object";
import DefaultObject from "./objects/default-object";

class Canvas {
    canvas: HTMLCanvasElement = document.createElement('canvas')
    context: null | CanvasRenderingContext2D = null
    components: DefaultObject[] = []
    debug: boolean = true

    constructor() {
        this.canvas.oncontextmenu = () => false
    }

    drawGrid() {
        if (this.context) {
            // Draw horizontal lines
            for (let i = 0; i < this.canvas.height; i = i + GRID_SCALE) {
                this.context.beginPath();
                this.context.moveTo(0, i);
                this.context.lineTo(this.canvas.width, i)
                this.context.strokeStyle = "#627d55";
                this.context.stroke()
            }

            // Draw vertical lines
            for (let i = 0; i < this.canvas.width; i = i + GRID_SCALE) {
                this.context.beginPath();
                this.context.moveTo(i, 0);
                this.context.lineTo(i, this.canvas.height)
                this.context.strokeStyle = "#627d55";
                this.context.stroke()
            }
        }
    }

    update() {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

            if (this.debug) this.drawGrid()

            this.components.forEach(component => {
                if (component instanceof CollideObject) this.detectCollision(component)
                component.render(this.context as CanvasRenderingContext2D)
            })
        }
    }

    detectCollision(component: CollideObject) {
        const collidingObject: CollideObject[] = []

        for (const object of this.components) {
            if (object instanceof CollideObject && object !== component) {
                if (
                    component.position.x <= object.position.x + object.width &&
                    object.position.x <= component.position.x + component.width &&
                    component.position.y <= object.position.y + object.height &&
                    object.position.y <= component.position.y + component.height
                ) {
                    collidingObject.push(object)
                }
            }
        }
        component.isCollide = collidingObject.length > 0
    }

    start() {
        this.canvas.className = 'canvas'
        this.canvas.width = CANVAS_WIDTH
        this.canvas.height = CANVAS_HEIGHT
        this.context = this.canvas.getContext('2d')
        if (this.context) this.context.imageSmoothingEnabled = false
        document.body.appendChild(this.canvas)
        setInterval(this.update.bind(this), 50)
    }

    addComponent(component: DefaultObject) {
        this.components.push(component)
    }

    getComponent(id: string): DefaultObject | undefined {
        // this should return ref to the object
        return this.components.find(c => c.id === id)
    }

    removeComponent(id: string) {
        this.components = this.components.filter(c => c.id === id)
    }
}

export default Canvas