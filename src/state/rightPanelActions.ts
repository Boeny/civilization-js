import { STATE } from "./state"

export function isRightPanelOpened(): boolean {
    return STATE.isRightPanelOpened
}

export function setRightPanelOpened(value: boolean) {
    STATE.isRightPanelOpened = value
}

export function toggleRightPanelOpened() {
    STATE.isRightPanelOpened = !STATE.isRightPanelOpened
}
