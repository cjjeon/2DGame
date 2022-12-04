import {CANVAS_HEIGHT, CANVAS_WIDTH} from "./constants";
import CollideObject from "./objects/collide-object";
import DefaultObject from "./objects/default-object";

class Canvas {
    canvas: HTMLCanvasElement = document.createElement('canvas')
    context: null | CanvasRenderingContext2D = null
    components: DefaultObject[] = []

    constructor(components: DefaultObject[]) {
        this.components = components
        this.canvas.oncontextmenu = () => false
    }

    update() {
        if (this.context) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
}

export default Canvas