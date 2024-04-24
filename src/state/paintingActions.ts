import { STATE } from "./state";

export function setPainting(isPainting: boolean) {
    STATE.isPainting = isPainting;
}

export function isPainting(): boolean {
    return STATE.isPainting;
}
