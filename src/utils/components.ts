import { ATTRS_MAP } from "const"
import { Attrs, BaseComponent, CSSProperties, Component, Content, FragmentComponent, NonStyleAttrs, ObservableAttr, StringComponent } from "types/components"

export function getFragmentComponent(content: Component[]): FragmentComponent {
    return {content}
}

export function getBaseComponent(
    element: HTMLElement,
    content?: Content,
    params?: Attrs
): BaseComponent {
    return {
        element,
        content,
        params,
    }
}

export function getStringComponent(element: string): StringComponent {
    return {element}
}

function isFragmentComponent(component: Content): component is FragmentComponent {
    if (!component || typeof component === 'string' || component instanceof Array) return false

    return !(component as object).hasOwnProperty('element')
}

function isStringComponent(component: Content): component is StringComponent {
    if (
        !component ||
        typeof component === 'string' ||
        typeof component === 'function' ||
        component instanceof Array ||
        isFragmentComponent(component)
    ) return false

    return typeof component.element === 'string'
}

export function insertContent(container: HTMLElement, content?: Content) {
    if (!content) return

    if (typeof content === 'string') {
        content = {element: content}
    }

    if (typeof content === 'function') {
        content()
        return
    }

    if (Array.isArray(content)) {
        content.forEach(item => insertContent(container, item))
        return
    }

    if (isFragmentComponent(content)) {
        insertContent(container, content.content)
        return
    }

    if (isStringComponent(content)) {
        container.innerHTML = content.element
        return
    }

    // content.element is object
    applyBaseComponentAttrs(content.element, content.params)
    insertContent(content.element, content.content)
    container.appendChild(content.element)
}

export function body(content: Content) {
    insertContent(document.body, content)
}

export function getClasses(classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function getStyle(initialStyle: CSSProperties, style: CSSProperties = {}): CSSProperties {
    return {...initialStyle, ...style}
}

export function trigger(event: string) {
    document.dispatchEvent(new Event(event))
}

export function adaptAndSetAttrs<T>(element: HTMLElement, params: T, attrs: ObservableAttr<T>[]) {
    const adaptedAttrs = attrs.reduce<Attrs>((acc, attr) => {
        (acc as any)[attr.name] = attr.value(params)
        return acc
    }, {})

    applyBaseComponentAttrs(element, adaptedAttrs)
}

function applyAttrs(element: any, params: NonStyleAttrs) {
    for (let field in params) {
        const value = params[field as keyof NonStyleAttrs]
        const adaptedField = ATTRS_MAP[field as keyof NonStyleAttrs]

        if (value !== undefined && adaptedField !== undefined) {
            element[adaptedField] = value
        }
    }
}

function getStyleAttr(attr: string | number): string {
    return typeof attr === 'number' ? `${attr}px` : attr
}

function applyStyle(element: HTMLElement, style?: CSSProperties) {
    if (!style) return

    for (let key in style) {
        const field = key as keyof CSSProperties
        const value = style[field]

        if (value !== undefined) {
            element.style[field] = field === 'zIndex' ? String(value) : getStyleAttr(value)
        }
    }
}

export function applyBaseComponentAttrs(element: HTMLElement, params?: Attrs) {
    if (!params) return

    const {style, ...rest} = params
    applyAttrs(element, rest)
    applyStyle(element, style)
}
