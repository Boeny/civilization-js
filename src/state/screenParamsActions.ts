import { ScreenParams } from "types"
import { STATE } from "./state"

export function getScreenParams(): ScreenParams | null {
    return STATE.screenParams
}

export function setScreenParamsAction(value: ScreenParams | null) {
    STATE.screenParams = value
}
