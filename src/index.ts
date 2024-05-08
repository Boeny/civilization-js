import './index.css'
import { globalStore, resetGlobalStore } from 'store'
import { MenuSwitchObservable } from 'menus/Menu'
import { ScreenSwitchObservable } from 'screens/Screen'
import { MENU_TYPE, MenuOption } from 'menus/types'
import { SCREEN_EVENT } from 'const'
import { KEY_CODE } from 'types'
import { MENU_SWITCH_EVENT } from 'menus/const'
import { body, trigger } from 'utils/components'
import { getParentMenu } from 'menus/utils'

const openMenu = (newMenu: MenuOption) => {
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
    body([
        MenuSwitchObservable({openMenu, openParentMenu}),
        ScreenSwitchObservable({openParentMenu}),
    ])
})

document.addEventListener('keydown', (e) => {
    if (e.key === KEY_CODE.esc) {
        openParentMenu()
    }
})
