import { Button } from "components/base/Button"
import { Fragment } from "components/base/Fragment"
import { trigger } from "utils/components"
import { globalStore } from "store"
import { editorScreenStore, resetEditorScreenStore } from "screens/EditorScreen/store"
import { SCREEN_EVENT } from "const"
import { MENU_TYPE, OpenMenuCallback } from "./types"
import { MAIN_MENU_OPTION, MENU_SWITCH_EVENT } from "./const"
import { generateEmptyMapData } from "screens/EditorScreen/utils"

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

function onClick(openMenu: OpenMenuCallback, current: MENU_TYPE.editorParams | MENU_TYPE.options) {
    openMenu({current, parent: MENU_TYPE.editorScreen})
}

interface Params {
    openMenu: OpenMenuCallback
    closeMenu: () => void
}
export function EditorScreenMenu({openMenu, closeMenu}: Params) {
    return Fragment([
        Button('Back to editing', {onClick: closeMenu}),
        Button('Back to main menu', {onClick: () => openMenu(MAIN_MENU_OPTION)}),
        Button('Reload map', {onClick: reload}),
        Button('New map', {onClick: () => onClick(openMenu, MENU_TYPE.editorParams)}),
        Button('Options', {onClick: () => onClick(openMenu, MENU_TYPE.options), disabled: true}),
    ])
}
