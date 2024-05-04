import { MENU_TYPE, SCREEN_EVENT, SCREEN_TYPE } from "const"
import { observable } from "hoc/observable"
import { getScreenParams } from "state/screenParamsActions"
import { GameScreen } from "./GameScreen"
import { EditorScreen } from "./EditorScreen/EditorScreen"
import { OpenMenuCallback } from "types"

interface Params {
    openMenu: OpenMenuCallback
}

export const Screen = observable<Params>(SCREEN_EVENT, ({openMenu}) => {
    const params = getScreenParams()

    switch (params?.type) {
        case SCREEN_TYPE.game: return GameScreen({openMenu: () => openMenu(MENU_TYPE.gameScreen, null)})
        case SCREEN_TYPE.editor: return EditorScreen({openMenu: () => openMenu(MENU_TYPE.editorScreen, null)})
        default: return null
    }
})
