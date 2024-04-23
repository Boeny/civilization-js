import { HEX_TYPE } from "const"

interface State {
    brush: HEX_TYPE | undefined;
}

const STATE: State = {
    brush: undefined,
}

export function clearBrushAction() {
    STATE.brush = undefined;
}

export function setBrushAction(type: HEX_TYPE): HEX_TYPE | undefined {
    const prevSelected = STATE.brush;
    STATE.brush = type;
    return prevSelected;
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
