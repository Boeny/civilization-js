import { Button, Fragment, Text } from "modules/renderer"
import { trigger } from "modules/observer"
import { MENU_TYPE, FOpenMenuCallback } from "./types"
import { SCREEN_EVENT } from "screens/const"
import { MAIN_MENU_OPTION, MENU_SWITCH_EVENT } from "./const"
import { generateEmptyMapData } from "screens/EditorScreen/utils"
import { globalStore } from "store"
import { editorScreenStore, resetEditorScreenStore } from "screens/EditorScreen/store"

function reload() {
    const {hexMapData, layer, hexWidth} = editorScreenStore

    resetEditorScreenStore({
        layer: layer.value,
        hexWidth: hexWidth.value,
        hexMapData: hexMapData.value ? generateEmptyMapData(hexMapData.value[0].length, hexMapData.value.length) : null,
    })
    trigger(SCREEN_EVENT)

    globalStore.menu = {current: null, parent: MENU_TYPE.editorScreen}
    trigger(MENU_SWITCH_EVENT)
}

function onClick(openMenu: FOpenMenuCallback, current: MENU_TYPE.editorParams | MENU_TYPE.options) {
    openMenu({current, parent: MENU_TYPE.editorScreen})
}

interface IParams {
    openMenu: FOpenMenuCallback
    closeMenu: () => void
}
export function EditorScreenMenu({openMenu, closeMenu}: IParams) {
    return Fragment([
        Button(Text('Back to editing'), {onClick: closeMenu}),
        Button(Text('Back to main menu'), {onClick: () => openMenu(MAIN_MENU_OPTION)}),
        Button(Text('Reload map'), {onClick: reload}),
        Button(Text('New map'), {onClick: () => onClick(openMenu, MENU_TYPE.editorParams)}),
        Button(Text('Options'), {onClick: () => onClick(openMenu, MENU_TYPE.options), disabled: true}),
    ])
}
