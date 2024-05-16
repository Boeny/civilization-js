import { observer } from "modules/observer"
import { SCREEN_TYPE } from "types"
import { SCREEN_EVENT } from "./const"
import { globalStore } from "store"
import { GameScreen } from "./GameScreen"
import { EditorScreen } from "./EditorScreen"

interface IParams {
    openParentMenu: () => void
}
export const ScreenSwitchObserver = observer<IParams>(SCREEN_EVENT, ({openParentMenu}) => {
    const {screen} = globalStore
    if (screen === null) return null

    switch (screen) {
        case SCREEN_TYPE.game: return GameScreen({openMenu: openParentMenu})
        case SCREEN_TYPE.editor: return EditorScreen({openMenu: openParentMenu})
        default: throw new Error('unknown screen type')
    }
})
