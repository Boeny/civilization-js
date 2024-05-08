import { NonStyleAttrs, SameAttrs } from './types/components'

export const SCREEN_EVENT = 'screen-update'

export const ATTRS_MAP: Record<keyof NonStyleAttrs, keyof GlobalEventHandlers | keyof SameAttrs | 'autofocus'> = {
    id: 'id',
    className: 'className',
    width: 'width',
    height: 'height',
    disabled: 'disabled',
    alt: 'alt',
    title: 'title',
    type: 'type',
    value: 'value',
    autoFocus: 'autofocus',
    onClick: 'onclick',
    onMouseDown: 'onmousedown',
    onMouseUp: 'onmouseup',
    onMouseMove: 'onmousemove',
    onKeyPress: 'onkeypress',
    onKeyDown: 'onkeydown',
    onKeyUp: 'onkeyup',
}

export const Z_INDEX_CONFIG = {
    left: {zIndex: 10},
    right: {zIndex: 10},
    top: {zIndex: 11},
    layout: {zIndex: 12},
} as const
