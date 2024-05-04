import { OpenMenuCallback } from "types"
import { MENU_TYPE } from "const"
import { Button } from "components/base/Button/Button"
import { Fragment } from "components/base/Fragment"

interface Params {
    openMenu: OpenMenuCallback
    onRestart: () => void
}

export function EditorScreenMenu({openMenu, onRestart}: Params) {
    return Fragment([
        Button('Back to editing', {id: 'close-menu-button', onClick: () => openMenu(null, null)}),
        Button('Back to main menu', {onClick: () => openMenu(MENU_TYPE.main, null)}),
        Button('Reload map', {onClick: () => onRestart()}),
        Button('New map', {onClick: () => openMenu(MENU_TYPE.editorParams, MENU_TYPE.editorScreen)}),
        Button('Options', {onClick: () => openMenu(MENU_TYPE.options, MENU_TYPE.editorScreen), disabled: true}),
    ])
}
