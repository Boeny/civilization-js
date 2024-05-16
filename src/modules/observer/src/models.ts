import { type BaseElement, type ICommonElement, insertContent } from "modules/renderer"
import { FComponent } from "./types"

export class SimpleValueStore<T> {
    protected _value: T

    constructor(defaultValue: T) {
        this._value = defaultValue
    }

    get value(): T {
        return this._value
    }
    set value(v: T) {
        this._value = v
    }
}

export class PreviousValueStore<T> extends SimpleValueStore<T> {
    prev: T

    constructor(defaultValue: T) {
        super(defaultValue)
        this.prev = defaultValue
    }

    get value(): T {
        return this._value
    }
    set value(v: T) {
        this.prev = this._value
        this._value = v
    }
}

export class ObserverElement<T> implements ICommonElement {
    constructor(public id: string, public component: FComponent<T>, public params?: T) {}

    insertSelfIntoContainer(container: BaseElement) {
        insertContent(container, this.component(this.params as T))
    }
}
