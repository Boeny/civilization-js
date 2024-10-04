import { IAttrs } from "./types"
import { applyBaseComponentAttrs, insertContent } from "./utils"

export interface ICommonElement {
    readonly type: string
    insertSelfIntoContainer(container: IContainerElement, selfIndex?: number): void
    componentWillUnmount(): void
}

export interface IContainerElement extends ICommonElement {
    element: HTMLElement | undefined
    append(content: ICommonElement | IContainerElement, contentIndex?: number): void
}

export class FragmentElement implements ICommonElement {
    readonly type = 'fragment'
    constructor(public content: Element[]) {}

    insertSelfIntoContainer(container: IContainerElement, selfIndex?: number) {
        if (!container.element) throw new Error('Container element should be created')
        if (selfIndex !== undefined) throw new Error('Fragment element should not have index')
        if (container.element.children.length > 0) throw new Error('Fragment element should be only one in the container')
        insertContent(container, this.content)
    }

    componentWillUnmount = () => {
        if (!this.content) return
        this.content.forEach((c) => c?.componentWillUnmount())
    }
}

export abstract class AppendableElement implements ICommonElement {
    abstract readonly type: string
    abstract element: HTMLElement | Text | string | undefined

    insertSelfIntoContainer(container: IContainerElement, selfIndex?: number) {
        if (!this.element) this.createElement(selfIndex) // create self as a child content
        if (!container.element) throw new Error('Container element should be created')
        container.element.append(this.element!)
    }

    abstract createElement(selfIndex?: number): void
    abstract componentWillUnmount(): void
}

export class TextElement extends AppendableElement {
    readonly type = 'text'
    element: Text | undefined

    constructor(public content: string) {
        super()
    }

    insertSelfIntoContainer(container: IContainerElement, selfIndex?: number) {
        if (!this.element) this.createElement() // create self as a child content
        if (!container.element) throw new Error('Container element should be created')
        if (selfIndex !== undefined) throw new Error('Text element should not have index')
        if (container.element.children.length > 0) throw new Error('Text element should be only one in the container')
        container.element.append(this.element!)
    }

    createElement(selfIndex?: number) {
        if (selfIndex !== undefined) throw new Error('Text element should not have index')
        this.element = document.createTextNode('')
        this.element.nodeValue = this.content
    }

    componentWillUnmount = () => {}
}

export interface ISvgParams {
    width?: number
    color?: string
}
export class SvgElement extends AppendableElement {
    readonly type = 'svg'
    element: string | undefined

    constructor(public content: string, public params?: ISvgParams) {
        super()
    }

    createElement(selfIndex?: number) {
        if (selfIndex !== undefined) throw new Error('Svg element should not have index')

        const {width, color} = this.params || {}

        if (width) {
            this.content = this.content.replace('width=""', `width="${width}"`)
        }
        if (color) {
            this.content = this.content.replace('fill="none"', `fill="${color}"`)
        }

        this.element = this.content
    }

    insertSelfIntoContainer(container: BaseElement, selfIndex?: number) {
        if (!this.element) this.createElement() // create self as a child content
        if (!container.element) throw new Error('Container element should be created')
        if (selfIndex !== undefined) throw new Error('Svg element should not have index')
        if (container.element.children.length > 0) throw new Error('Svg element should be only one in the container')
        container.element.innerHTML = this.element!
    }

    componentWillUnmount = () => {}
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
    readonly type = 'canvas'
    element: HTMLCanvasElement | undefined
    ctx!: CanvasRenderingContext2D

    constructor(public content: (ctx: CanvasRenderingContext2D) => void, public params?: ICanvasParams) {
        super()
    }

    createElement(selfIndex?: number) {
        this.element = document.createElement(this.type)
        this.ctx = this.element.getContext('2d')!

        const {onClick, onMouseDown, onMouseMove, onMouseUp} = this.params || {}

        applyBaseComponentAttrs(this.element, {
            ...this.params,
            key: selfIndex === undefined ? undefined : String(selfIndex),
            onClick: onClick ? (e) => onClick(this.ctx, e.offsetX, e.offsetY) : undefined,
            onMouseDown: onMouseDown ? (e) => onMouseDown(this.ctx, e.offsetX, e.offsetY) : undefined,
            onMouseMove: onMouseMove ? (e) => onMouseMove(this.ctx, e.offsetX, e.offsetY) : undefined,
            onMouseUp: onMouseUp ? (e) => onMouseUp(this.ctx, e.offsetX, e.offsetY) : undefined,
        })
    }

    insertSelfIntoContainer(container: BaseElement, selfIndex?: number) {
        super.insertSelfIntoContainer(container, selfIndex)
        this.content(this.ctx)
    }

    componentWillUnmount = () => {}
}

export interface IInputParams extends IAttrs {
    onChange: (value: string, key: string) => void
}
export class InputElement extends AppendableElement {
    readonly type = 'input'
    element: HTMLInputElement | undefined

    constructor(public params?: IInputParams) {
        super()
    }

    createElement(selfIndex?: number) {
        const {onChange} = this.params || {}
        this.element = document.createElement(this.type)

        applyBaseComponentAttrs(this.element, {
            ...this.params,
            key: selfIndex === undefined ? undefined : String(selfIndex),
            onKeyUp: onChange ? (e) => onChange(this.element!.value, e.key) : undefined
        })
    }

    componentWillUnmount = () => {}
}

export class BaseElement extends AppendableElement implements IContainerElement {
    element: HTMLElement | undefined

    constructor(
        public readonly type: string,
        public content?: Content,
        public params?: IAttrs
    ) {
        super()
    }

    createElement(selfIndex?: number) {
        this.element = document.createElement(this.type)
        applyBaseComponentAttrs(this.element, {...this.params, key: selfIndex === undefined ? undefined : String(selfIndex)})
    }

    append(content: ICommonElement, contentIndex?: number) {
        content.insertSelfIntoContainer(this, contentIndex) // create child and add to this element
    }

    insertSelfIntoContainer(container: BaseElement, selfIndex?: number) {
        if (!this.element) this.createElement(selfIndex) // create self as a content
        insertContent(this, this.content) // add children

        // add self to the container
        if (!container.element) throw new Error('Container element should be created')
        container.element.append(this.element!)
    }

    componentWillUnmount = () => {
        if (!this.content) return

        if (this.content instanceof Array) {
            this.content.forEach(c => c?.componentWillUnmount())
        } else {
            this.content.componentWillUnmount()
        }
    }
}

export class BodyElement implements IContainerElement {
    readonly type = 'body'
    element = document.body

    append(content: ICommonElement, contentIndex?: number) {
        content.insertSelfIntoContainer(this, contentIndex) // create child and add to this element
    }

    insertSelfIntoContainer(container: IContainerElement, selfIndex?: number | undefined) {}
    componentWillUnmount() {}
}

export type Element = IContainerElement | ICommonElement | null
export type Content = Element | Element[]
