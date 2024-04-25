import { LAYER_TYPE } from "const";
import { STATE } from "./state";
import { trigger } from "utils";

export function getCurrentLayer(): LAYER_TYPE | undefined {
    return STATE.layer;
}

export function setLayerAction(type: LAYER_TYPE): LAYER_TYPE | undefined {
    const prevSelected = STATE.layer;
    STATE.layer = type;
    return prevSelected;
}

export function isLayerSelected(type: LAYER_TYPE): boolean {
    return STATE.layer === type;
}

function isAnyLayerSelected(): boolean {
    return STATE.layer !== undefined;
}

export function selectLayerAction(type: LAYER_TYPE, getLayerKey: (type: LAYER_TYPE) => string) {
    if (isLayerSelected(type)) return;

    const key = getLayerKey(type);

    if (isAnyLayerSelected()) {
        const prevSelectedLayer = setLayerAction(type)!;
        trigger(getLayerKey(prevSelectedLayer));
        trigger(key);
        return;
    }

    setLayerAction(type);
    trigger(key);
}
