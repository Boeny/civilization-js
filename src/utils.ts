import { Attrs, BaseComponent, CSSProperties, Component, Content, FragmentComponent, ObservableAttr, StringComponent } from "types"
import { ATTRS_MAP } from "const"

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

export function body(content: Content, reset = false) {
    if (reset) document.body.innerHTML = ''
    insertContent(document.body, content)
}

export function onLoad(callback: () => void) {
    document.addEventListener('DOMContentLoaded', callback)
}

export function getClasses(classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ')
}

export function convertToInteger(value: string): number {
    return value.includes('.') ? NaN : Number(value)
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

function applyAttrs(element: HTMLElement, params: Attrs) {
    for (let field in params) {
        const value = params[field as keyof Attrs]
        const adaptedField = (ATTRS_MAP as any)[field]

        if (value !== undefined && adaptedField !== undefined) {
            (element as any)[adaptedField] = value
        }
    }
}

function getStyleAttr(attr: string | number): string {
    return typeof attr === 'number' ? `${attr}px` : attr
}

function applyStyle(element: HTMLElement, style?: CSSProperties) {
    if (!style) return

    for (let field in style) {
        const value = style[field as keyof CSSProperties]

        if (value !== undefined) {
            (element.style as any)[field] = getStyleAttr(value)
        }
    }
}

export function applyBaseComponentAttrs(element: HTMLElement, params?: Attrs) {
    if (!params) return

    applyAttrs(element, params)
    applyStyle(element, params.style)
}

export async function uploadFile() {
    try {
        const [imageFile] = await window.showOpenFilePicker({
            types: [{
                description: "Images",
                accept: {"image/*": [".png", ".gif", ".jpeg", ".jpg"]},
            }],
            excludeAcceptAllOption: true,
            multiple: false,
        })

        const file = await imageFile.getFile()
        const img = new Image()
        img.src = URL.createObjectURL(file)

        img.onerror = function () {
            URL.revokeObjectURL(this.src)
            console.error("Cannot load image")
        }

        return new Promise<HTMLImageElement>(resolve => {
            img.onload = function () {
                URL.revokeObjectURL(img.src)
                resolve(img)
            }
        })
    }
    catch(e) {
        console.error(e)
    }
}
