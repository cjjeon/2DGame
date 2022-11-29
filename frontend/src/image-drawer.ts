import {Position} from "./type";

class ImageDrawer {
    private position: Position
    private src: string
    private image: HTMLImageElement;

    constructor(imgSrc: string, position: Position) {
        this.position = position
        this.src = imgSrc

        this.image = new Image()
        this.image.src = this.src
    }

    draw() {

    }
}