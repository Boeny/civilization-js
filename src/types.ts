export type Content = string | Component | Component[] | (() => void)

export interface FragmentComponent {
    content: Component[]
}

export interface StringComponent {
    element: string
}

export interface BaseComponent {
    element: HTMLElement
    content?: Content
    params?: Attrs
}

export type Component = FragmentComponent | BaseComponent | StringComponent | null

export interface CustormFieldSetElement<T> extends HTMLFieldSetElement {
    name: string
    value: string
    getValue: () => T
    checkSubmitValidity: () => boolean
    setSubmitError: () => void
    removeSubmitError: () => void
}

export type MapData = number[][]

export type MapDataRow = number[]

export interface CSSProperties {
    left?: string | number
    top?: string | number
    width?: string | number
    height?: string | number
    display?: string
    background?: string
    overflow?: string
    overflowX?: string
    overflowY?: string
    margin?: string | number
    marginLeft?: string | number
    marginRight?: string | number
    marginTop?: string | number
    marginBottom?: string | number
    padding?: string | number
    paddingLeft?: string | number
    paddingRight?: string | number
    paddingTop?: string | number
    paddingBottom?: string | number
}

export interface Attrs {
    id?: string
    className?: string
    disabled?: boolean
    alt?: string
    title?: string
    autoFocus?: boolean
    type?: string
    style?: CSSProperties
    onClick?: (e: MouseEvent) => void
    onMouseDown?: (e: MouseEvent) => void
    onMouseUp?: (e: MouseEvent) => void
    onMouseMove?: (e: MouseEvent) => void
}

export interface ObservableAttr<T> {
    name: string
    value: (params: T) => any
}
