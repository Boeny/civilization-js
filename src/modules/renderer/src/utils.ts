import { ATTRS_MAP } from "./const"
import { BaseElement, Content } from "./models"
import { IAttrs, ICSSProperties, INonStyleAttrs } from "./types"

export function getClasses(classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function getStyle(initialStyle: ICSSProperties, style: ICSSProperties = {}): ICSSProperties {
    return {...initialStyle, ...style}
}

function applyAttrs(element: any, params: INonStyleAttrs) {
    for (let key in params) {
        const field = key as keyof INonStyleAttrs
        const value = params[field]
        const adaptedField = ATTRS_MAP[field]

        if (value !== undefined && adaptedField !== undefined) {
            element[adaptedField] = value
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

export function insertContent(container: BaseElement, content?: Content) {
    if (!container || !content) return

    if (Array.isArray(content)) {
        content.forEach(item => insertContent(container, item))
        return
    }

    container.append(content)
}

export function render(content?: Content) {
    insertContent(new BaseElement('body'), content)
}
