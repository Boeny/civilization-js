import type { IAttrs } from "modules/renderer"
import * as renderer from 'modules/renderer'
import { IObserverAttr } from "./types"

export function adaptAndSetAttrs<T>(element: HTMLElement, params: T, attrs: IObserverAttr<T>[]) {
    const adaptedAttrs = attrs.reduce<IAttrs>((acc, attr) => {
        (acc as any)[attr.name] = attr.value(params)
        return acc
    }, {})

    renderer.applyBaseComponentAttrs(element, adaptedAttrs)
}

export function trigger(event: string) {
    document.dispatchEvent(new Event(event))
}
