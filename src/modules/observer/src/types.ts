import { AppendableElement, BaseElement, CanvasElement, IAttrs, InputElement } from "modules/renderer"

export type IObserverContentElement = IObserverElement | BaseElement | CanvasElement | InputElement

export type FComponent = (...args: any) => IObserverContentElement | null

export interface IObserverElement extends AppendableElement {
    element: HTMLElement | HTMLCanvasElement | HTMLInputElement | undefined
    content: IObserverContentElement | null
    update: () => void
}

export interface IObserverAttr<T> {
    name: keyof IAttrs
    value: (params: T) => IAttrs[keyof IAttrs]
}
