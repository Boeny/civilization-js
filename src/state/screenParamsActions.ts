import { STATE, ScreenParams } from "./state"

export function getScreenParams(): ScreenParams | null {
    return STATE.screenParams
}

export function setScreenParamsAction(value: ScreenParams | null) {
    STATE.screenParams = value
}
