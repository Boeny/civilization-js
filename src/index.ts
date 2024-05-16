import './index.css'
import { render } from 'modules/renderer'
import { trigger } from 'modules/observer'

import { KEY_CODE } from 'types'
import { MENU_TYPE, IMenuOption } from 'menus/types'
import { MENU_SWITCH_EVENT } from 'menus/const'
import { SCREEN_EVENT } from 'screens/const'
import { getParentMenu } from 'menus/utils'
import { globalStore, resetGlobalStore } from 'store'

import { MenuSwitchObserver } from 'menus/Menu'
import { ScreenSwitchObserver } from 'screens/Screen'

const openMenu = (newMenu: IMenuOption) => {
    if (newMenu.current === MENU_TYPE.main) {
        resetGlobalStore()
        trigger(SCREEN_EVENT)
    } else {
        globalStore.menu = newMenu
    }

    trigger(MENU_SWITCH_EVENT)
}

function openParentMenu() {
    const parentMenu = getParentMenu(globalStore.menu)
    if (parentMenu) {
        openMenu(parentMenu)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // TODO: implement render with fiber mechanizm
    render([
        MenuSwitchObserver({openMenu, openParentMenu}),
        ScreenSwitchObserver({openParentMenu}),
    ])
})

document.addEventListener('keydown', (e) => {
    if (e.key === KEY_CODE.esc) {
        openParentMenu()
    }
})
