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

    constructor(public content: (ctx: CanvasRenderingContext2D) => void, public params?: ICanvasParams) {
        super()
    }

    createElement() {
        this.element = document.createElement('canvas')
        const ctx = this.element.getContext('2d')!
        this.content(ctx)

        const {onClick, onMouseDown, onMouseMove, onMouseUp} = this.params || {}

        applyBaseComponentAttrs(this.element, {
            ...this.params,
            onClick: onClick ? (e) => onClick(ctx, e.offsetX, e.offsetY) : undefined,
            onMouseDown: onMouseDown ? (e) => onMouseDown(ctx, e.offsetX, e.offsetY) : undefined,
            onMouseMove: onMouseMove ? (e) => onMouseMove(ctx, e.offsetX, e.offsetY) : undefined,
            onMouseUp: onMouseUp ? (e) => onMouseUp(ctx, e.offsetX, e.offsetY) : undefined,
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

        if (type === 'body') {
            this.element = document.body
        }
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

export type Element = ICommonElement | null
export type Content = Element | Element[]
