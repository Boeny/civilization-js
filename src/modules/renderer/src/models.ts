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

export class TextElement implements ICommonElement {
    constructor(public content: string) {}

    insertSelfIntoContainer(container: BaseElement) {
        const element = document.createTextNode('')
        element.nodeValue = this.content
        document.createElement(container.type).append(element)
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
export class CanvasElement implements ICommonElement {
    constructor(public content: (ctx: CanvasRenderingContext2D) => void, public params?: ICanvasParams) {}

    insertSelfIntoContainer(container: BaseElement) {
        const element = document.createElement('canvas')
        const ctx = element.getContext('2d')!
        this.content(ctx)

        const {onClick, onMouseDown, onMouseMove, onMouseUp} = this.params || {}

        applyBaseComponentAttrs(element, {
            ...this.params,
            onClick: onClick ? (e) => onClick(ctx, e.offsetX, e.offsetY) : undefined,
            onMouseDown: onMouseDown ? (e) => onMouseDown(ctx, e.offsetX, e.offsetY) : undefined,
            onMouseMove: onMouseMove ? (e) => onMouseMove(ctx, e.offsetX, e.offsetY) : undefined,
            onMouseUp: onMouseUp ? (e) => onMouseUp(ctx, e.offsetX, e.offsetY) : undefined,
        })
        document.createElement(container.type).append(element)
    }
}

export interface IInputParams extends IAttrs {
    onChange: (value: string, key: string) => void
}
export class InputElement implements ICommonElement {
    constructor(public params?: IInputParams) {}

    insertSelfIntoContainer(container: BaseElement) {
        const {onChange} = this.params || {}
        const element = document.createElement('input')

        applyBaseComponentAttrs(element, {
            ...this.params,
            onKeyUp: onChange ? (e) => onChange(element.value, e.key) : undefined
        })
        document.createElement(container.type).append(element)
    }
}

export class BaseElement implements ICommonElement {
    constructor(
        public type: string,
        public content?: Content,
        public params?: IAttrs
    ) {}

    insertSelfIntoContainer(container: BaseElement): void {
        insertContent(this, this.content)

        const element = document.createElement(this.type)
        applyBaseComponentAttrs(element, this.params)
        document.createElement(container.type).append(element)
    }
}

export type Element = ICommonElement | null
export type Content = Element | Element[]
