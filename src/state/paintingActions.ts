import { STATE } from "./state";

export function setPainting(value: boolean) {
    STATE.isPainting = value;
}

export function isPainting(): boolean {
    return STATE.isPainting;
}
