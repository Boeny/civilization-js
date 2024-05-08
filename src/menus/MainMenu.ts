import { Button } from "components/base/Button"
import { Fragment } from "components/base/Fragment"
import { MENU_TYPE, OpenMenuCallback } from "./types"

function onClick(openMenu: OpenMenuCallback, current: MENU_TYPE.gameParams | MENU_TYPE.editorParams | MENU_TYPE.options) {
    openMenu({current, parent: MENU_TYPE.main})
}

interface Params {
    openMenu: OpenMenuCallback
}
export function MainMenu({openMenu}: Params) {
    return Fragment([
        Button('New Game', {onClick: () => onClick(openMenu, MENU_TYPE.gameParams), disabled: true}),
        Button('Editor', {onClick: () => onClick(openMenu, MENU_TYPE.editorParams)}),
        Button('Options', {onClick: () => onClick(openMenu, MENU_TYPE.options), disabled: true}),
    ])
}
