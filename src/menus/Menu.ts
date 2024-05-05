import { MenuParams, OpenMenuCallback, ScreenParams } from "types"
import { MENU_EVENT, MENU_TYPE, SCREEN_EVENT } from "const"
import { trigger } from "utils"
import { generateEmptyMapData } from "logic"
import { setHexMapDataAction } from "state/mapActions"
import { getOpenedMenu, setOpenedMenuAction } from "state/menuActions"
import { setScreenParamsAction } from "state/screenParamsActions"
import { observable } from "hoc/observable"

import { Block } from "components/Block/Block"
import { Popup } from "components/Popup/Popup"
import { MainMenu } from "./MainMenu"
import { NewGameParamsMenu } from "./NewGameParamsMenu"
import { EditorParamsMenu } from "./EditorParamsMenu"
import { OptionsMenu } from "./OptionsMenu"
import { GameScreenMenu } from "./GameScreenMenu"
import { EditorScreenMenu } from "./EditorScreenMenu"

function createScreenAction(params: ScreenParams) {
    setHexMapDataAction(generateEmptyMapData(params.width, params.height))
    setScreenParamsAction(params)
    trigger(SCREEN_EVENT)

    setOpenedMenuAction(null, null)
    trigger(MENU_EVENT)
}

interface MenuContentParams extends Params {
    menu: MenuParams
}

function MenuContent({menu, openMenu}: MenuContentParams) {
    const {current, parent} = menu;

    switch (current) {
        case MENU_TYPE.main: return MainMenu({onClick: (item) => openMenu(item, MENU_TYPE.main)})
        case MENU_TYPE.newGameParams: return NewGameParamsMenu({onBackClick: () => openMenu(parent, null), onSubmit: createScreenAction})
        case MENU_TYPE.editorParams: return EditorParamsMenu({onBackClick: () => openMenu(parent, null), onSubmit: createScreenAction})
        case MENU_TYPE.options: return OptionsMenu({onBackClick: () => openMenu(parent, null)})
        case MENU_TYPE.gameScreen: return GameScreenMenu({openMenu, onRestart: () => {}})
        case MENU_TYPE.editorScreen: return EditorScreenMenu({openMenu, onRestart: () => {}})
        default: return null
    }
}


interface Params {
    openMenu: OpenMenuCallback
}

export const Menu = observable(MENU_EVENT, ({openMenu}: Params) => {
    const menu = getOpenedMenu()
    const menuContent = MenuContent({menu, openMenu})

    if (!menuContent) return null

    return Popup(
        Block(
            menuContent,
            {className: 'flex-column'}
        )
    )
})
