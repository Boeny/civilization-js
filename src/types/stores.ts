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

    set value(v: T) {
        this.prev = super.value
        super.value = v
    }
}
