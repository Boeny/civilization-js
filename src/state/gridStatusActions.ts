import { STATE } from "./state"

export function isGridTurnedOn(): boolean {
    return STATE.isGridTurnedOn
}

export function setGridTurnedOn(value: boolean) {
    STATE.isGridTurnedOn = value
}
