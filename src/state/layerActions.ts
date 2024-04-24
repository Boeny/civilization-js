import { LAYER_TYPE } from "const";
import { STATE } from "./state";

export function setLayerAction(type: LAYER_TYPE): LAYER_TYPE | undefined {
    const prevSelected = STATE.layer;
    STATE.layer = type;
    return prevSelected;
}

export function isLayerSelected(type: LAYER_TYPE): boolean {
    return STATE.layer === type;
}

export function isAnyLayerSelected(): boolean {
    return STATE.layer !== undefined;
}
