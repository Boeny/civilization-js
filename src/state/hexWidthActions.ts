import { STATE } from "./state";

export function setHexWidthAction(size: number) {
    STATE.hexWidth = size;
}

export function getHexWidth(): number {
    return STATE.hexWidth;
}
