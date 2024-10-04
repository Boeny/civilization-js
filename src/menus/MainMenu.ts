import { Button, Fragment, Text } from "modules/renderer"
import { MENU_TYPE, FOpenMenuCallback } from "./types"

function onClick(openMenu: FOpenMenuCallback, current: MENU_TYPE.gameParams | MENU_TYPE.editorParams | MENU_TYPE.options) {
    openMenu({current, parent: MENU_TYPE.main})
}

interface IParams {
    openMenu: FOpenMenuCallback
}
export function MainMenu({openMenu}: IParams) {
    return Fragment([
        Button(Text('New Game'), {onClick: () => onClick(openMenu, MENU_TYPE.gameParams), disabled: true}),
        Button(Text('Editor'), {onClick: () => onClick(openMenu, MENU_TYPE.editorParams)}),
        Button(Text('Options'), {onClick: () => onClick(openMenu, MENU_TYPE.options), disabled: true}),
    ])
}
