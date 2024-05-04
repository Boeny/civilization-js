import './index.css'
import { MENU_TYPE, SCREEN_TYPE } from 'const'
import { body, onLoad, trigger } from "utils"
import { MenuParams, ScreenParams, setDefaultStateAction } from 'state/state'
import { getOpenedMenu, setOpenedMenuAction } from 'state/menuActions'
import { getScreenParams, setScreenParamsAction } from 'state/screenParamsActions'
import { observable } from 'hoc/observable'

import { MainMenu } from "components/menus/MainMenu"
import { OptionsMenu } from 'components/menus/OptionsMenu'
import { EditorParamsMenu } from 'components/menus/EditorParamsMenu'
import { NewGameParamsMenu } from 'components/menus/NewGameParamsMenu'
import { Popup } from 'components/Popup/Popup'
import { GameScreen } from 'screens/GameScreen'
import { setHexMapDataAction } from 'state/mapActions'
import { generateEmptyMapData } from 'logic'
import { EditorScreen } from 'screens/EditorScreen/EditorScreen'
import { GameScreenMenu } from 'components/menus/GameScreenMenu'
import { EditorScreenMenu } from 'components/menus/EditorScreenMenu'
import { Block } from 'components/Block/Block'

const MENU_EVENT = 'open-menu'
const SCREEN_EVENT = 'screen-update'

function openMenu(current: MenuParams['current'], parent: MenuParams['parent']) {
    if (current === MENU_TYPE.main) {
        setDefaultStateAction()
        trigger(SCREEN_EVENT)
    } else {
        setOpenedMenuAction(current, parent)
    }

    trigger(MENU_EVENT)
}

function createScreen(params: ScreenParams) {
    setHexMapDataAction(generateEmptyMapData(params.width, params.height))
    setScreenParamsAction(params)
    trigger(SCREEN_EVENT)

    setOpenedMenuAction(null, null)
    trigger(MENU_EVENT)
}

function MenuContent({current, parent}: MenuParams) {
    switch (current) {
        case MENU_TYPE.main: return MainMenu({onClick: (item) => openMenu(item, MENU_TYPE.main)})
        case MENU_TYPE.newGameParams: return NewGameParamsMenu({onBackClick: () => openMenu(parent, null), onSubmit: createScreen})
        case MENU_TYPE.editorParams: return EditorParamsMenu({onBackClick: () => openMenu(parent, null), onSubmit: createScreen})
        case MENU_TYPE.options: return OptionsMenu({onBackClick: () => openMenu(parent, null)})
        case MENU_TYPE.gameScreen: return GameScreenMenu({openMenu, onRestart: () => {}})
        case MENU_TYPE.editorScreen: return EditorScreenMenu({openMenu, onRestart: () => {}})
        default: return null
    }
}

const Menu = observable(MENU_EVENT, () => {
    const menu = getOpenedMenu()
    const menuContent = MenuContent(menu)

    if (!menuContent) return null

    return Popup(
        Block(
            menuContent,
            {className: 'flex-column'}
        )
    )
})

const Screen = observable(SCREEN_EVENT, () => {
    const params = getScreenParams()

    switch (params?.type) {
        case SCREEN_TYPE.game: return GameScreen({openMenu: () => openMenu(MENU_TYPE.gameScreen, null)})
        case SCREEN_TYPE.editor: return EditorScreen({openMenu: () => openMenu(MENU_TYPE.editorScreen, null)})
        default: return null
    }
})

onLoad(() => {
    body([
        Menu(),
        Screen(),
    ])
})
