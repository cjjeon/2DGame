import PlayerImage from '../assets/player.png'
import Component from "../component";
import {Position} from "./type";

type Animate = 'STALE' | 'MOVING' | 'ATTACK'

interface State {
    position: Position
    sourceImgPosition: Position
    scale: number
    speed: number
    animate: Animate
    movingDirection: {
        x: 'LEFT' | 'RIGHT' | null,
        y: 'UP' | 'DOWN' | null,
    }
}

// 48 x 48 pixel
const IMAGE_SIZE = 48

class Player extends Component {
    state: State = {
        position: {
            x: 0,
            y: 0
        },
        sourceImgPosition: {
            x: 0,
            y: 0,
        },
        scale: 2,
        animate: 'STALE',
        speed: 10,
        movingDirection: {
            x: null,
            y: null,
        }
    }
    private image: HTMLImageElement;

    constructor(state: Partial<State>) {
        super();
        this.state = {
            ...this.state,
            ...state
        }

        this.image = new Image()
        this.image.src = PlayerImage

        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.state.movingDirection.x = 'RIGHT'
                this.state.animate = 'MOVING'
            }
            if (event.key === 'ArrowLeft') {
                this.state.movingDirection.x = 'LEFT'
                this.state.animate = 'MOVING'
            }
            if (event.key === 'ArrowUp') {
                this.state.movingDirection.y = 'UP'
                this.state.animate = 'MOVING'
            }
            if (event.key === 'ArrowDown') {
                this.state.movingDirection.y = 'DOWN'
                this.state.animate = 'MOVING'
            }
            if (event.key === ' ') {
                this.state.animate = 'ATTACK'
                this.state.sourceImgPosition.x = 0
            }
        })

        document.addEventListener('keyup', (event) => {
            if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                this.state.movingDirection.x = null
            }
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                this.state.movingDirection.y = null
            }

            if (this.state.movingDirection.x === null && this.state.movingDirection.y === null) this.state.animate = 'STALE'
        })

    }

    updateFrame() {
        if (this.state.animate === 'ATTACK') {
            this.state.sourceImgPosition.x += 48
            if (this.state.sourceImgPosition.x >= 48 * 3) {
                this.state.sourceImgPosition.x = 0
                this.state.animate = "MOVING";
            }
        } else {
            this.state.sourceImgPosition.x += 48
            if (this.state.sourceImgPosition.x >= 48 * 6) {
                this.state.sourceImgPosition.x = 0
            }
        }

    }

    updateState() {
        if (this.state.animate === 'MOVING') {
            if (this.state.movingDirection.x === 'RIGHT') {
                this.state.position.x += this.state.speed;
            }
            if (this.state.movingDirection.x === 'LEFT') {
                this.state.position.x -= this.state.speed;
            }
            if (this.state.movingDirection.y === 'UP') {
                this.state.position.y -= this.state.speed;
            }
            if (this.state.movingDirection.y === 'DOWN') {
                this.state.position.y += this.state.speed;
            }
        }
    }

    getImageRow() {
        if (this.state.animate === 'ATTACK') {
            return 48 * 2
        }
        if (this.state.animate === 'MOVING') {
            return 48
        }
        // STALE
        return 0
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(this.image,
            this.state.sourceImgPosition.x,
            this.getImageRow(),
            48,
            48,
            this.state.position.x,
            this.state.position.y,
            48 * this.state.scale,
            48 * this.state.scale,
        )
        this.updateFrame()
        this.updateState()
    }
}

export default Player