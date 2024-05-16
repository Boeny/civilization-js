import { IAttrs } from "./types"
import { applyBaseComponentAttrs, insertContent } from "./utils"

export interface ICommonElement {
    insertSelfIntoContainer(container: BaseElement): void
}

export class FragmentElement implements ICommonElement {
    constructor(public content: Element[]) {}

    insertSelfIntoContainer(container: BaseElement) {
        insertContent(container, this.content)
    }
}

export abstract class AppendableElement implements ICommonElement {
    abstract element: HTMLElement | Text | string | null

    insertSelfIntoContainer(container: BaseElement) {
        if (!this.element) this.createElement() // create self as a child content
        container.element!.append(this.element!)
    }

    abstract createElement(): void
}

export class TextElement extends AppendableElement {
    element: Text | null = null

    constructor(public content: string) {
        super()
    }

    createElement() {
        this.element = document.createTextNode('')
        this.element.nodeValue = this.content
    }
}

export interface ISvgParams {
    width?: number
    color?: string
}
export class SvgElement extends AppendableElement {
    element: string | null = null

    constructor(public content: string, public params?: ISvgParams) {
        super()
    }

    insertSelfIntoContainer(container: BaseElement) {
        if (!this.element) this.createElement() // create self as a child content
        container.element!.innerHTML = this.element!
    }

    createElement() {
        const {width, color} = this.params || {}

        if (width) {
            this.content = this.content.replace('width=""', `width="${width}"`)
        }
        if (color) {
            this.content = this.content.replace('fill="none"', `fill="${color}"`)
        }

        this.element = this.content
    }
}

export interface ICanvasParams extends Omit<IAttrs, 'onClick' | 'onMouseDown' | 'onMouseMove' | 'onMouseUp'> {
    width?: number
    height?: number
    onClick?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseDown?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseMove?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
    onMouseUp?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void
}
export class CanvasElement extends AppendableElement {
    element: HTMLCanvasElement | null = null
    ctx: CanvasRenderingContext2D | null = null

    constructor(public content: (ctx: CanvasRenderingContext2D) => void, public params?: ICanvasParams) {
        super()
    }

    insertSelfIntoContainer(container: BaseElement) {
        super.insertSelfIntoContainer(container)
        this.content(this.ctx!)
    }

    createElement() {
        this.element = document.createElement('canvas')
        this.ctx = this.element.getContext('2d')!

        const {onClick, onMouseDown, onMouseMove, onMouseUp} = this.params || {}

        applyBaseComponentAttrs(this.element, {
            ...this.params,
            onClick: onClick ? (e) => onClick(this.ctx!, e.offsetX, e.offsetY) : undefined,
            onMouseDown: onMouseDown ? (e) => onMouseDown(this.ctx!, e.offsetX, e.offsetY) : undefined,
            onMouseMove: onMouseMove ? (e) => onMouseMove(this.ctx!, e.offsetX, e.offsetY) : undefined,
            onMouseUp: onMouseUp ? (e) => onMouseUp(this.ctx!, e.offsetX, e.offsetY) : undefined,
        })
    }
}

export interface IInputParams extends IAttrs {
    onChange: (value: string, key: string) => void
}
export class InputElement extends AppendableElement {
    element: HTMLInputElement | null = null

    constructor(public params?: IInputParams) {
        super()
    }

    createElement() {
        const {onChange} = this.params || {}
        this.element = document.createElement('input')

        applyBaseComponentAttrs(this.element, {
            ...this.params,
            onKeyUp: onChange ? (e) => onChange(this.element!.value, e.key) : undefined
        })
    }
}

export class BaseElement extends AppendableElement {
    element: HTMLElement | null = null

    constructor(
        public type: string,
        public content?: Content,
        public params?: IAttrs
    ) {
        super()
    }

    insertSelfIntoContainer(container: BaseElement) {
        insertContent(this, this.content) // create self and add children
        super.insertSelfIntoContainer(container) // create and add self to the container
    }

    append(content: ICommonElement) {
        if (!this.element) this.createElement() // create self
        content.insertSelfIntoContainer(this) // create child and add to this element
    }

    createElement() {
        this.element = document.createElement(this.type)
        applyBaseComponentAttrs(this.element, this.params)
    }
}

export class BodyElement extends BaseElement {
    element = document.body

    constructor() {
        super('')
    }

    createElement() {}
}

export type Element = ICommonElement | null
export type Content = Element | Element[]
