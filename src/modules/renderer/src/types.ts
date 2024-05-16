export interface ICSSProperties {
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

interface IEventAttrs {
    onClick?: (e: MouseEvent) => void
    onMouseDown?: (e: MouseEvent) => void
    onMouseUp?: (e: MouseEvent) => void
    onMouseMove?: (e: MouseEvent) => void
    onKeyPress?: (e: KeyboardEvent) => void
    onKeyDown?: (e: KeyboardEvent) => void
    onKeyUp?: (e: KeyboardEvent) => void
}

export interface ISameAttrs {
    id?: string
    className?: string
    disabled?: boolean
    alt?: string
    title?: string
    type?: string
    width?: string | number
    height?: string | number
    value?: string
    src?: string
    fill?: string
}

export interface IAttrs extends ISameAttrs, IEventAttrs {
    style?: ICSSProperties
    autoFocus?: boolean
}

export type INonStyleAttrs = Omit<IAttrs, 'style'>
