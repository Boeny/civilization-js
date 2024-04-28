import { LAYER_TYPE } from "const";
import { STATE } from "./state";
import { trigger } from "utils";

export function getLayer(): LAYER_TYPE {
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

export function selectLayerAction(type: LAYER_TYPE, layerMapKey: string, getLayerKey: (type: LAYER_TYPE) => string) {
    if (isLayerSelected(type)) return;

    const key = getLayerKey(type);

    if (isAnyLayerSelected()) {
        const prevSelectedLayer = setLayerAction(type)!;
        trigger(getLayerKey(prevSelectedLayer));
        trigger(key);
        trigger(layerMapKey);
        return;
    }

    setLayerAction(type);
    trigger(key);
    trigger(layerMapKey);
}
