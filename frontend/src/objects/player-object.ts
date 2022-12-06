import PlayerImage from '../assets/player.png'
import {GRID_SCALE} from "../constants";
import {Position, UserAnimation} from "../type";
import CollideObject, {CollideObjectProps} from "./collide-object";


type MovingDirect = {
    x: 'LEFT' | 'RIGHT' | null,
    y: 'UP' | 'DOWN' | null,
}

export interface PlayerObjectProps extends CollideObjectProps {
    sourceImgPosition: Position
    speed: number
    animate: UserAnimation
    movingDirection: MovingDirect
    image: HTMLImageElement
}


class PlayerObject extends CollideObject implements PlayerObjectProps {
    sourceImgPosition = {
        x: 0, y: 0
    }
    scale = 2
    speed = 10
    animate = UserAnimation.STALE
    movingDirection: MovingDirect = {
        x: null, y: null
    }
    image = new Image()

    private testLine: string = "black";

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
            this.animate = UserAnimation.MOVING
        }
        if (event.key === 'ArrowLeft') {
            this.movingDirection.x = 'LEFT'
            this.animate = UserAnimation.MOVING
        }
        if (event.key === 'ArrowUp') {
            this.movingDirection.y = 'UP'
            this.animate = UserAnimation.MOVING
        }
        if (event.key === 'ArrowDown') {
            this.movingDirection.y = 'DOWN'
            this.animate = UserAnimation.MOVING
        }
        if (event.key === ' ') {
            this.animate = UserAnimation.ATTACK
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

        if (this.movingDirection.x === null && this.movingDirection.y === null) this.animate = UserAnimation.STALE
    }

    updateFrame() {
        if (this.animate === UserAnimation.ATTACK) {
            this.sourceImgPosition.x += this.dimension.width
            if (this.sourceImgPosition.x >= this.dimension.width * 3) {
                this.sourceImgPosition.x = 0
                this.animate = UserAnimation.MOVING;
            }
        } else {
            this.sourceImgPosition.x += this.dimension.width
            if (this.sourceImgPosition.x >= this.dimension.width * 6) {
                this.sourceImgPosition.x = 0
            }
        }
    }

    getImageRow() {
        if (this.animate === UserAnimation.ATTACK) {
            return this.dimension.height * 2
        }
        if (this.animate === UserAnimation.MOVING) {
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
            this.position.x * GRID_SCALE,
            this.position.y * GRID_SCALE,
            this.width,
            this.height,
        )

        context.beginPath();
        context.rect(this.position.x * GRID_SCALE, this.position.y * GRID_SCALE, this.width, this.height)
        context.strokeStyle = this.testLine
        context.stroke();
        this.updateFrame();
    }
}

export default PlayerObject