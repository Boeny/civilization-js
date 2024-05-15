import {INonStyleAttrs, ISameAttrs} from './types'

export const ATTRS_MAP: Record<keyof INonStyleAttrs, keyof GlobalEventHandlers | keyof ISameAttrs | 'autofocus'> = {
    id: 'id',
    className: 'className',
    width: 'width',
    height: 'height',
    disabled: 'disabled',
    alt: 'alt',
    title: 'title',
    type: 'type',
    value: 'value',
    src: 'src',
    autoFocus: 'autofocus',
    onClick: 'onclick',
    onMouseDown: 'onmousedown',
    onMouseUp: 'onmouseup',
    onMouseMove: 'onmousemove',
    onKeyPress: 'onkeypress',
    onKeyDown: 'onkeydown',
    onKeyUp: 'onkeyup',
}
