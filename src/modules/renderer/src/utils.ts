import { ATTRS_MAP, EVENT_HANDLERS } from "./const"
import { BodyElement, Content, IContainerElement } from "./models"
import { IAttrs, ICSSProperties, IEventAttrs, INonStyleAttrs } from "./types"

export function getClasses(classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function getStyle(initialStyle: ICSSProperties, style: ICSSProperties = {}): ICSSProperties {
    return {...initialStyle, ...style}
}

function applyAttrs(element: HTMLElement, params: INonStyleAttrs) {
    for (let key in params) {
        const field = key as keyof INonStyleAttrs
        const value = params[field]
        const adaptedField = ATTRS_MAP[field]

        if (value !== undefined && adaptedField !== undefined) {
            if (field in EVENT_HANDLERS) {
                element[EVENT_HANDLERS[field as keyof IEventAttrs]] = value as any // because (e: MouseEvent) => void is not compatible with (this: GlobalEventHandlers, ev: UIEvent) => void
            } else {
                element.setAttribute(adaptedField, String(value))
            }
        }
    }
}

function getStyleAttr(attr: string | number): string {
    return typeof attr === 'number' ? `${attr}px` : attr
}

function applyStyle(element: HTMLElement, style?: ICSSProperties) {
    if (!style) return

    for (let key in style) {
        const field = key as keyof ICSSProperties
        const value = style[field]

        if (value !== undefined) {
            element.style[field] = field === 'zIndex' ? String(value) : getStyleAttr(value)
        }
    }
}

export function applyBaseComponentAttrs(element: HTMLElement, params?: IAttrs) {
    if (!params) return

    const {style, ...rest} = params
    applyAttrs(element, rest)
    applyStyle(element, style)
}

export function insertContent(container: IContainerElement, content?: Content, contentIndex?: number) {
    if (!container || !content) return

    if (Array.isArray(content)) {
        content.forEach((item, i) => insertContent(container, item, i))
        return
    }

    container.append(content, contentIndex)
}

export function render(content?: Content) {
    insertContent(new BodyElement(), content)
}
