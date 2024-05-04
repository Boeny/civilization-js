import { STATE } from "./state"
import { MenuParams, OpenMenuCallback } from "types"

export function getOpenedMenu(): MenuParams {
    return STATE.openedMenu
}

export const setOpenedMenuAction: OpenMenuCallback = (current, parent) => {
    STATE.openedMenu = {current, parent}
}
