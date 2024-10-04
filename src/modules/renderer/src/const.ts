import {IEventAttrs, INonStyleAttrs, ISameAttrs} from './types'

const SAME_ATTRS: Record<keyof ISameAttrs, keyof ISameAttrs> = {
    id: 'id',
    width: 'width',
    height: 'height',
    disabled: 'disabled',
    alt: 'alt',
    title: 'title',
    type: 'type',
    value: 'value',
    src: 'src',
    fill: 'fill',
    key: 'key',
}

export const EVENT_HANDLERS: Record<keyof IEventAttrs, keyof GlobalEventHandlers> = {
    onClick: 'onclick',
    onMouseDown: 'onmousedown',
    onMouseUp: 'onmouseup',
    onMouseMove: 'onmousemove',
    onKeyPress: 'onkeypress',
    onKeyDown: 'onkeydown',
    onKeyUp: 'onkeyup',
}

export const ATTRS_MAP: Record<keyof INonStyleAttrs, keyof GlobalEventHandlers | keyof ISameAttrs | 'autofocus' | 'class'> = {
    autoFocus: 'autofocus',
    className: 'class',
    ...SAME_ATTRS,
    ...EVENT_HANDLERS,
}
