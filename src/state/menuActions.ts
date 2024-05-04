import { MENU_TYPE } from "const"
import { STATE, State } from "./state"

export function getOpenedMenu(): State['openedMenu'] {
    return STATE.openedMenu
}

export function setOpenedMenuAction(current: MENU_TYPE | null, parent: MENU_TYPE | null) {
    STATE.openedMenu = {current, parent}
}
