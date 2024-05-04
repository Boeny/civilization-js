import { LAYER_TYPE } from "const"
import { STATE } from "./state"

export function getLayer(): LAYER_TYPE {
    return STATE.layer
}

export function setLayerAction(type: LAYER_TYPE): LAYER_TYPE | null {
    const prevSelected = STATE.layer
    STATE.layer = type
    return prevSelected
}

export function isLayerSelected(type: LAYER_TYPE): boolean {
    return STATE.layer === type
}
