import { HEX_TYPE } from "const";
import { STATE } from "./state";
import { trigger } from "utils";

export function setBrushAction(type: HEX_TYPE | undefined): HEX_TYPE | undefined {
    const prevSelected = STATE.brush;
    STATE.brush = type;
    return prevSelected;
}

export function getBrush(): HEX_TYPE | undefined {
    return STATE.brush;
}

export function isBrushSelected(type: HEX_TYPE): boolean {
    return STATE.brush === type;
}

export function isAnyBrushSelected(): boolean {
    return STATE.brush !== undefined;
}

function toggleBrushAction(type: HEX_TYPE) {
    STATE.brush = STATE.brush === type ? undefined : type;
}

export function selectBrushAction(type: HEX_TYPE, getBrushKey: (type: HEX_TYPE) => string) {
    const key = getBrushKey(type);

    if (isAnyBrushSelected() && !isBrushSelected(type)) {
        const prevSelectedBrush = setBrushAction(type)!;
        trigger(getBrushKey(prevSelectedBrush));
        trigger(key);
        return;
    }

    toggleBrushAction(type);
    trigger(key);
}
