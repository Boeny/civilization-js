import { HEX_TYPE } from "const"

interface State {
    brush: HEX_TYPE | undefined;
    isPainting: boolean;
}

const STATE: State = {
    brush: undefined,
    isPainting: false,
}

export function clearBrushAction() {
    STATE.brush = undefined;
}

export function setBrushAction(type: HEX_TYPE): HEX_TYPE | undefined {
    const prevSelected = STATE.brush;
    STATE.brush = type;
    return prevSelected;
}

export function getBrush(): HEX_TYPE | undefined {
    return STATE.brush;
}

export function toggleBrushAction(type: HEX_TYPE) {
    STATE.brush = STATE.brush === type ? undefined : type;
}

export function isBrushSelected(type: HEX_TYPE): boolean {
    return STATE.brush === type;
}

export function isAnyBrushSelected(): boolean {
    return STATE.brush !== undefined;
}

export function setPainting(isPainting: boolean) {
    STATE.isPainting = isPainting;
}

export function isPainting(): boolean {
    return STATE.isPainting;
}
