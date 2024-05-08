import { SCREEN_EVENT } from "const"
import { observable } from "hoc/observable"
import { globalStore } from "store"
import { GameScreen } from "./GameScreen"
import { EditorScreen } from "./EditorScreen"
import { SCREEN_TYPE } from "types"

interface Params {
    openParentMenu: () => void
}
export const ScreenSwitchObservable = observable<Params>(SCREEN_EVENT, ({openParentMenu}) => {
    const {screen} = globalStore
    if (screen === null) return null

    switch (screen) {
        case SCREEN_TYPE.game: return GameScreen({openMenu: openParentMenu})
        case SCREEN_TYPE.editor: return EditorScreen({openMenu: openParentMenu})
        default: throw new Error('unknown screen type')
    }
})
