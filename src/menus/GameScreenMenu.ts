import { Button } from "components/base/Button"
import { Fragment } from "components/base/Fragment"
import { MENU_TYPE, OpenMenuCallback } from "./types"
import { MAIN_MENU_OPTION } from "./const"

function onClick(openMenu: OpenMenuCallback, current: MENU_TYPE.gameParams | MENU_TYPE.options) {
    openMenu({current, parent: MENU_TYPE.gameScreen})
}

interface Params {
    openMenu: OpenMenuCallback
    closeMenu: () => void
}
export function GameScreenMenu({openMenu, closeMenu}: Params) {
    return Fragment([
        Button('Back to the game', {onClick: closeMenu}),
        Button('Back to main menu', {onClick: () => openMenu(MAIN_MENU_OPTION)}),
        Button('Restart game', {onClick: () => {}}),
        Button('New game', {onClick: () => onClick(openMenu, MENU_TYPE.gameParams)}),
        Button('Options', {onClick: () => onClick(openMenu, MENU_TYPE.options), disabled: true}),
    ])
}
