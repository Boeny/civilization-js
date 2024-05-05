import { BaseComponent, Component, ObservableAttr } from "types"
import { adaptAndSetAttrs, insertContent } from "utils"

export function observable<T>(id: string, component: (params: T) => Component) {
    const container = document.createElement('observable')
    const cache = {replaceElement: () => {}}

    document.addEventListener(id, () => cache.replaceElement())

    return (initialParams?: T) => {
        cache.replaceElement = () => {
            container.innerHTML = ''
            insertContent(container, component(initialParams as T))
        }

        container.innerHTML = ''

        return {
            element: container,
            content: component(initialParams as T),
        } as BaseComponent
    }
}

interface AttrsCache {
    element: HTMLElement
    setAttrs: () => void
}

export function observableAttrs<T>(id: string, component: (params: T) => BaseComponent, attrs: ObservableAttr<T>[]) {
    const cache: AttrsCache = {element: null!, setAttrs: () => {}}

    document.addEventListener(id, () => cache.setAttrs())

    return (params?: T) => {
        const baseComponent = component(params as T)
        cache.element = baseComponent.element
        cache.setAttrs = () => adaptAndSetAttrs(cache.element, params as T, attrs)
        cache.setAttrs()
        return baseComponent
    }
}
