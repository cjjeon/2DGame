import PlayerImage from '../assets/player.png'
import {Position} from "../type";
import CollideObject, {CollideObjectProps} from "./collide-object";

enum Animate {
    STALE = 'STALE',
    MOVING = 'MOVING',
    ATTACK = 'ATTACK'
}

type MovingDirect = {
    x: 'LEFT' | 'RIGHT' | null,
    y: 'UP' | 'DOWN' | null,
}

export interface PlayerObjectProps extends CollideObjectProps {
    sourceImgPosition: Position
    speed: number
    animate: Animate
    movingDirection: MovingDirect
    image: HTMLImageElement
}


class PlayerObject extends CollideObject implements PlayerObjectProps {
    sourceImgPosition = {
        x: 0, y: 0
    }
    scale = 2
    speed = 10
    animate = Animate.STALE
    movingDirection: MovingDirect = {
        x: null, y: null
    }
    image = new Image()

    constructor(props: Partial<PlayerObjectProps>) {
        super(props);
        Object.assign(this, props)

        this.image.src = PlayerImage
        document.addEventListener('keydown', this.onKeyDown.bind(this))
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.key === 'ArrowRight') {
            this.movingDirection.x = 'RIGHT'
            this.animate = Animate.MOVING
        }
        if (event.key === 'ArrowLeft') {
            this.movingDirection.x = 'LEFT'
            this.animate = Animate.MOVING
        }
        if (event.key === 'ArrowUp') {
            this.movingDirection.y = 'UP'
            this.animate = Animate.MOVING
        }
        if (event.key === 'ArrowDown') {
            this.movingDirection.y = 'DOWN'
            this.animate = Animate.MOVING
        }
        if (event.key === ' ') {
            this.animate = Animate.ATTACK
            this.sourceImgPosition.x = 0
        }
    }

    onKeyUp(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            this.movingDirection.x = null
        }
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            this.movingDirection.y = null
        }

        if (this.movingDirection.x === null && this.movingDirection.y === null) this.animate = Animate.STALE
    }

    updateFrame() {
        if (this.animate === Animate.ATTACK) {
            this.sourceImgPosition.x += this.dimension.width
            if (this.sourceImgPosition.x >= this.dimension.width * 3) {
                this.sourceImgPosition.x = 0
                this.animate = Animate.MOVING;
            }
        } else {
            this.sourceImgPosition.x += this.dimension.width
            if (this.sourceImgPosition.x >= this.dimension.width * 6) {
                this.sourceImgPosition.x = 0
            }
        }

    }

    move(reverse: boolean) {
        let x = 0
        let y = 0
        if (this.movingDirection.x === 'RIGHT') x = this.speed
        if (this.movingDirection.x === 'LEFT') x = this.speed * -1
        if (this.movingDirection.y === 'UP') y = this.speed * -1
        if (this.movingDirection.y === 'DOWN') y = this.speed

        if (reverse) {
            x = x * -1
            y = y * -1
        }

        this.position.x += x;
        this.position.y += y;
    }

    updateState() {
        if (this.animate === Animate.MOVING) {
            this.move(false);
            const objects = this.detectCollision()
            if (objects.length > 0) this.move(true)
        }
    }

    getImageRow() {
        if (this.animate === Animate.ATTACK) {
            return this.dimension.height * 2
        }
        if (this.animate === Animate.MOVING) {
            return this.dimension.height
        }
        // STALE
        return 0
    }


    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.image,
            this.sourceImgPosition.x,
            this.getImageRow(),
            this.dimension.width,
            this.dimension.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
        )

        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height)
        context.stroke();
        this.updateFrame()
        this.updateState()
    }
}

export default PlayerObject