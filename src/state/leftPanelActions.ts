import { STATE } from "./state";

export function isLeftPanelOpened(): boolean {
    return STATE.isLeftPanelOpened;
}

export function setLeftPanelOpened(value: boolean) {
    STATE.isLeftPanelOpened = value;
}

export function toggleLeftPanelOpened() {
    STATE.isLeftPanelOpened = !STATE.isLeftPanelOpened;
}
