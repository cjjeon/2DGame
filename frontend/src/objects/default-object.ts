export interface DefaultObjectProps {
    id: string
}

class DefaultObject {
    id: string = ''

    constructor(props: Partial<DefaultObjectProps>) {
        Object.assign(this, props)
    }

    render(context: CanvasRenderingContext2D) {
    }
}

export default DefaultObject
