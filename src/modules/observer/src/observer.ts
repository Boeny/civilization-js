import { FComponent, IObserverAttr } from "./types"
import { ObserverElement } from "./models"
import { adaptAndSetAttrs } from "./utils"

export function observer<T>(id: string, component: FComponent<T>) {
    return (params?: T) => {
        return new ObserverElement(
            id,
            component,
            params,
        )
    }
}

interface AttrsCache {
    element: HTMLElement
    setAttrs: () => void
}

export function observerAttrs<T>(id: string, component: FComponent<T>, attrs: IObserverAttr<T>[]) {
    const cache: AttrsCache = {element: null!, setAttrs: () => {}}

    document.addEventListener(id, () => cache.setAttrs())

    return (params?: T) => {
        const baseComponent = component(params as T)
        //cache.element = baseComponent.element
        cache.setAttrs = () => adaptAndSetAttrs(cache.element, params as T, attrs)
        cache.setAttrs()
        return baseComponent
    }
}
