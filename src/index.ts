import './index.css'
import { OpenMenuCallback } from 'types'
import { MENU_EVENT, MENU_TYPE, SCREEN_EVENT } from 'const'
import { body, onLoad, trigger } from "utils"
import { setDefaultStateAction } from 'state/state'
import { setOpenedMenuAction } from 'state/menuActions'
import { Screen } from 'screens/Screen'
import { Menu } from 'menus/Menu'

const openMenu: OpenMenuCallback = (current, parent) => {
    if (current === MENU_TYPE.main) {
        setDefaultStateAction()
        trigger(SCREEN_EVENT)
    } else {
        setOpenedMenuAction(current, parent)
    }

    trigger(MENU_EVENT)
}

onLoad(() => {
    body([
        Menu({openMenu}),
        Screen({openMenu}),
    ])
})
