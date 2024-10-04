import { FComponent, IObserverAttr } from "./types"
import { ObserverElement } from "./models"
import { adaptAndSetAttrs } from "./utils"

export function observer<F extends FComponent>(id: string, component: F) {
    return (...params: Parameters<F>) => {
        return new ObserverElement(
            id,
            component,
            ...params,
        )
    }
}

export function observerAttrs<T, F extends FComponent>(id: string, component: F, attrs: IObserverAttr<T>[]) {
    return (...params: Parameters<F>) => {
        return new ObserverElement(
            id,
            component,
            ...params,
        )
    }
}
