import { OpenMenuCallback } from "types"
import { MENU_TYPE } from "const"
import { Button } from "components/base/Button/Button"
import { Fragment } from "components/base/Fragment"

interface Params {
    openMenu: OpenMenuCallback
    onRestart: () => void
}

export function GameScreenMenu({openMenu, onRestart}: Params) {
    return Fragment([
        Button('Back to the game', {id: 'close-menu-button', onClick: () => openMenu(null, null)}),
        Button('Back to main menu', {onClick: () => openMenu(MENU_TYPE.main, null)}),
        Button('Restart game', {onClick: onRestart}),
        Button('New game', {onClick: () => openMenu(MENU_TYPE.newGameParams, MENU_TYPE.gameScreen)}),
        Button('Options', {disabled: true, onClick: () => openMenu(MENU_TYPE.options, MENU_TYPE.gameScreen)}),
    ])
}
