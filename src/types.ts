import { MENU_TYPE, SCREEN_TYPE } from "const"

export interface MenuParams {
    current: MENU_TYPE | null
    parent: MENU_TYPE | null
}

export interface ScreenParams {
    type: SCREEN_TYPE
    width: number
    height: number
    hexWidth: number
}

export type OpenMenuCallback = (current: MenuParams['current'], parent: MenuParams['parent']) => void

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

export type MapData = number[][]

export type MapDataRow = number[]

export interface CSSProperties {
    zIndex?: number
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

interface EventAttrs {
    onClick?: (e: MouseEvent) => void
    onMouseDown?: (e: MouseEvent) => void
    onMouseUp?: (e: MouseEvent) => void
    onMouseMove?: (e: MouseEvent) => void
    onKeyPress?: (e: KeyboardEvent) => void
    onKeyDown?: (e: KeyboardEvent) => void
    onKeyUp?: (e: KeyboardEvent) => void
}

export interface SameAttrs {
    id?: string
    className?: string
    disabled?: boolean
    alt?: string
    title?: string
    type?: string
    width?: string | number
    height?: string | number
    value?: string
}

export interface Attrs extends SameAttrs, EventAttrs {
    style?: CSSProperties
    autoFocus?: boolean
}

export type NonStyleAttrs = Omit<Attrs, 'style'>

export interface ObservableAttr<T> {
    name: keyof Attrs
    value: (params: T) => Attrs[keyof Attrs]
}
