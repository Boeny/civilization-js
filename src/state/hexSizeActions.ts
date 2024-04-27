import { STATE } from "./state";

export function setHexSizeAction(size: number) {
    STATE.hexSize = size;
}

export function getHexSize(): number {
    return STATE.hexSize;
}
