import { checkSubmitValidity } from "./utils"
import { editorParamsMenuStore, resetEditorParamsMenuStore, updateFields } from "./store"
import { Button } from "components/base/Button"
import { HexMapParamsBlock } from "./HexMapParamsBlock"
import { Fragment } from "components/base/Fragment"
import { Block } from "components/Block"
import { resetEditorScreenStore } from "screens/EditorScreen/store"
import { resetGlobalStore } from "store"
import { LAYER_TYPE } from "screens/EditorScreen/types"
import { SCREEN_TYPE } from "types"
import { EditorParamsMenuOption, MENU_TYPE } from "menus/types"
import { SCREEN_EVENT } from "const"
import { MENU_SWITCH_EVENT } from "menus/const"
import { trigger } from "utils/components"
import { generateEmptyMapData } from "screens/EditorScreen/utils"
import { StartFromLayerButtonObservable } from "./StartFromLayerButton"

function submit() {
    const errors = checkSubmitValidity(editorParamsMenuStore.hexMapParams)
    if (errors.length > 0) {
        updateFields()
        return
    }

    const {layer} = editorParamsMenuStore
    const hexMapParams = layer === LAYER_TYPE.image ? null : editorParamsMenuStore.hexMapParams

    resetEditorScreenStore({
        layer,
        hexWidth: hexMapParams?.hexWidth || 0,
        hexMapData: hexMapParams ? generateEmptyMapData(hexMapParams.width, hexMapParams.height) : null,
    })

    resetGlobalStore({
        screen: SCREEN_TYPE.editor,
        menu: {current: null, parent: MENU_TYPE.editorScreen},
    })

    trigger(SCREEN_EVENT)
    trigger(MENU_SWITCH_EVENT)
}

interface Params {
    parent: EditorParamsMenuOption['parent']
    openParentMenu: () => void
}
export function EditorParamsMenu({parent, openParentMenu}: Params) {
    resetEditorParamsMenuStore()

    return Fragment([
        Button(`Back to ${parent === MENU_TYPE.main ? 'main' : 'editor'} menu`, {onClick: openParentMenu}),
        HexMapParamsBlock({onEnterKeyDown: submit}),
        Block(StartFromLayerButtonObservable(), {bordered: true}),
        Button('Create map', {onClick: submit}),
    ])
}
