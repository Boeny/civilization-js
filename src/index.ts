import './index.css'
import { OpenMenuCallback } from 'types'
import { KEY_CODE, MENU_EVENT, MENU_TYPE, SCREEN_EVENT, SCREEN_TYPE } from 'const'
import { body, trigger } from "utils"
import { setDefaultStateAction } from 'state/state'
import { getOpenedMenu, setOpenedMenuAction } from 'state/menuActions'
import { getScreenParams } from 'state/screenParamsActions'
import { Menu } from 'menus/Menu'
import { Screen } from 'screens/Screen'

const openMenu: OpenMenuCallback = (current, parent) => {
    if (current === MENU_TYPE.main) {
        setDefaultStateAction()
        trigger(SCREEN_EVENT)
    } else {
        setOpenedMenuAction(current, parent)
    }

    trigger(MENU_EVENT)
}

document.addEventListener('DOMContentLoaded', () => {
    body([
        Menu({openMenu}),
        Screen({openMenu}),
    ])
})

document.addEventListener('keydown', (e) => {
    if (e.key === KEY_CODE.esc) {
        const {current, parent} = getOpenedMenu()

        switch (current) {
            case MENU_TYPE.main: return
            case MENU_TYPE.newGameParams: openMenu(parent, null); return
            case MENU_TYPE.editorParams: openMenu(parent, null); return
            case MENU_TYPE.options: openMenu(parent, null); return
            case MENU_TYPE.gameScreen: openMenu(null, null); return
            case MENU_TYPE.editorScreen: openMenu(null, null); return
            case null:
                const screen = getScreenParams()
                if (!screen) throw new Error('without any screen there should be main menu')

                switch (screen.type) {
                    case SCREEN_TYPE.game: openMenu(MENU_TYPE.gameScreen, null); return
                    case SCREEN_TYPE.editor: openMenu(MENU_TYPE.editorScreen, null); return
                    default: throw new Error('unknown screen type')
                }
            default: throw new Error('unknown menu type')
        }
    }
})
