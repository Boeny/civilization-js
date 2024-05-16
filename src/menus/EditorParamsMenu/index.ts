import { Button, Fragment, Text } from "modules/renderer"
import { trigger } from "modules/observer"

import { SCREEN_TYPE } from "types"
import { IEditorParamsMenuOption, MENU_TYPE } from "menus/types"
import { LAYER_TYPE } from "screens/EditorScreen/types"
import { MENU_SWITCH_EVENT } from "menus/const"
import { SCREEN_EVENT } from "screens/const"
import { generateEmptyMapData } from "screens/EditorScreen/utils"
import { checkSubmitValidity } from "./utils"

import { resetGlobalStore } from "store"
import { resetEditorScreenStore } from "screens/EditorScreen/store"
import { editorParamsMenuStore, resetEditorParamsMenuStore, updateFields } from "./store"

import { Block } from "components/Block"
import { StartFromLayerButtonObserver } from "./StartFromLayerButton"
import { HexMapParamsBlock } from "./HexMapParamsBlock"

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

interface IParams {
    parent: IEditorParamsMenuOption['parent']
    openParentMenu: () => void
}
export function EditorParamsMenu({parent, openParentMenu}: IParams) {
    resetEditorParamsMenuStore()

    return Fragment([
        Button(Text(`Back to ${parent === MENU_TYPE.main ? 'main' : 'editor'} menu`), {onClick: openParentMenu}),
        HexMapParamsBlock({onEnterKeyDown: submit}),
        Block(StartFromLayerButtonObserver(), {bordered: true}),
        Button(Text('Create map'), {onClick: submit}),
    ])
}
