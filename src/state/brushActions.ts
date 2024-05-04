import { HEX_TYPE } from "const"
import { STATE } from "./state"

export function setBrushAction(type: HEX_TYPE | null): HEX_TYPE | null {
    const prevSelected = STATE.brush
    STATE.brush = type
    return prevSelected
}

export function getBrush(): HEX_TYPE | null {
    return STATE.brush
}

export function isBrushSelected(type: HEX_TYPE): boolean {
    return STATE.brush === type
}

export function isAnyBrushSelected(): boolean {
    return STATE.brush !== null
}

export function toggleBrushAction(type: HEX_TYPE) {
    STATE.brush = STATE.brush === type ? null : type
}
