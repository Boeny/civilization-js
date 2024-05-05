import { MenuParams, OpenMenuCallback, ScreenParams } from "types"
import { MENU_EVENT, MENU_TYPE, SCREEN_EVENT } from "const"
import { trigger } from "utils"
import { generateEmptyMapData } from "logic"
import { setDefaultStateAction } from "state/state"
import { getOpenedMenu } from "state/menuActions"
import { getScreenParams } from "state/screenParamsActions"
import { observable } from "hoc/observable"

import { Block } from "components/Block/Block"
import { Popup } from "components/Popup/Popup"
import { MainMenu } from "./MainMenu"
import { NewGameParamsMenu } from "./NewGameParamsMenu"
import { EditorParamsMenu } from "./EditorParamsMenu"
import { OptionsMenu } from "./OptionsMenu"
import { GameScreenMenu } from "./GameScreenMenu"
import { EditorScreenMenu } from "./EditorScreenMenu"

interface Params extends ContainerParams {
    menu: MenuParams
    screenParams: ScreenParams | null
    onSubmit: (screenParams: ScreenParams | null) => void
}

function Menu({menu, screenParams, openMenu, onSubmit}: Params) {
    const {current, parent} = menu;

    switch (current) {
        case MENU_TYPE.main: return MainMenu({onClick: (item) => openMenu(item, MENU_TYPE.main)})
        case MENU_TYPE.newGameParams: return NewGameParamsMenu({onBackClick: () => openMenu(parent, null), onSubmit})
        case MENU_TYPE.editorParams: return EditorParamsMenu({onBackClick: () => openMenu(parent, null), onSubmit})
        case MENU_TYPE.options: return OptionsMenu({onBackClick: () => openMenu(parent, null)})
        case MENU_TYPE.gameScreen: return GameScreenMenu({openMenu, onRestart: () => onSubmit(screenParams)})
        case MENU_TYPE.editorScreen: return EditorScreenMenu({openMenu, onRestart: () => onSubmit(screenParams)})
        case null: return null
        default: throw new Error('unknown menu type')
    }
}


function createScreenAction(screenParams: ScreenParams | null) {
    if (!screenParams) throw new Error('provide screen params to create a screen')

    setDefaultStateAction({
        hexMapData: generateEmptyMapData(screenParams.width, screenParams.height),
        openedMenu: {current: null, parent: null},
        screenParams,
    })
    trigger(SCREEN_EVENT)
    trigger(MENU_EVENT)
}

interface ContainerParams {
    openMenu: OpenMenuCallback
}

export const MenuContainer = observable(MENU_EVENT, ({openMenu}: ContainerParams) => {
    const menuContent = Menu({
        menu: getOpenedMenu(),
        screenParams: getScreenParams(),
        openMenu,
        onSubmit: createScreenAction
    })

    if (!menuContent) return null

    return Popup(
        Block(
            menuContent,
            {className: 'flex-column'}
        )
    )
})
