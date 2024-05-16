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

export function observerAttrs<T>(id: string, component: FComponent<T>, attrs: IObserverAttr<T>[]) {
    return (params?: T) => {
        return new ObserverElement(
            id,
            component,
            params,
        )
    }
}
