import { BaseElement, insertContent } from "modules/renderer"
import { FComponent, IObserverContentElement, IObserverElement } from "./types"

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

export class ObserverElement<T, F extends FComponent> implements IObserverElement {
    readonly type = 'observer'
    content: IObserverContentElement | null

    get element() {
        return this.content?.element
    }

    constructor(public id: string, public component: F, public params?: T) {
        this.content = component(params)
    }

    createElement(selfIndex?: number) {
        this.content?.createElement(selfIndex)
    }

    update = () => {}

    insertSelfIntoContainer(container: BaseElement, selfIndex?: number) {
        if (!container.element) throw new Error('Container element should be created')
        const containerElement = container.element

        this.update = () => {
            const c = this.component(this.params)

            if (selfIndex === undefined) {
                if (c) {
                    if (containerElement.children.length > 1) throw new Error(`Observer update: ${c.type} element should be only one in the container`)
                    containerElement.innerHTML = ''
                    c.insertSelfIntoContainer(container)
                } else {
                    if (containerElement.children.length > 0) {
                        this.content?.componentWillUnmount()
                        containerElement.innerHTML = ''
                    }
                }
                this.content = c
                return
            }

            let nextElement: Element | null = null

            for (let i = 0; i <  containerElement.children.length; i += 1) {
                const child = containerElement.children[i]
                const key = child.getAttribute('key')
                if (!key) throw new Error('key should exist')

                const childIndex = parseInt(key)

                if (childIndex === selfIndex) {
                    if (c) {
                        c.createElement(selfIndex)

                        if (c.element) {
                            if (c instanceof BaseElement) {
                                insertContent(c, c.content) // add children
                            }
                        }
                    }

                    this.content?.componentWillUnmount()
                    this.content = c

                    if (c) {
                        if (c.element) child.replaceWith(c.element)
                    } else {
                        child.remove()
                    }
                    return
                }

                if (childIndex > selfIndex) {
                    nextElement = child
                }
            }

            // if not found
            if (c) {
                c.createElement(selfIndex)

                if (c.element) {
                    if (c instanceof BaseElement) {
                        insertContent(c, c.content) // add children
                    }

                    if (nextElement) {
                        containerElement.insertBefore(c.element!, nextElement)
                    } else {
                        containerElement.append(c.element!)
                    }
                }
            }
            this.content = c
        }

        document.addEventListener(this.id, this.update)
        insertContent(container, this.content, selfIndex)
    }

    componentWillUnmount = () => {
        this.content?.componentWillUnmount()
        document.removeEventListener(this.id, this.update)
    }
}
