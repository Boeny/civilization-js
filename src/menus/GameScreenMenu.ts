import { Button, Fragment, Text } from "modules/renderer"
import { MENU_TYPE, FOpenMenuCallback } from "./types"
import { MAIN_MENU_OPTION } from "./const"

function onClick(openMenu: FOpenMenuCallback, current: MENU_TYPE.gameParams | MENU_TYPE.options) {
    openMenu({current, parent: MENU_TYPE.gameScreen})
}

interface IParams {
    openMenu: FOpenMenuCallback
    closeMenu: () => void
}
export function GameScreenMenu({openMenu, closeMenu}: IParams) {
    return Fragment([
        Button(Text('Back to the game'), {onClick: closeMenu}),
        Button(Text('Back to main menu'), {onClick: () => openMenu(MAIN_MENU_OPTION)}),
        Button(Text('Restart game'), {onClick: () => {}}),
        Button(Text('New game'), {onClick: () => onClick(openMenu, MENU_TYPE.gameParams)}),
        Button(Text('Options'), {onClick: () => onClick(openMenu, MENU_TYPE.options), disabled: true}),
    ])
}
