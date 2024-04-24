import { HEX_TYPE } from "const";
import { STATE } from "./state";

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
