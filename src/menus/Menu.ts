import { globalStore } from "store"
import { observable } from "hoc/observable"
import { Block } from "components/Block"
import { Popup } from "components/Popup"
import { MainMenu } from "./MainMenu"
import { GameParamsMenu } from "./GameParamsMenu"
import { EditorParamsMenu } from "./EditorParamsMenu"
import { OptionsMenu } from "./OptionsMenu"
import { GameScreenMenu } from "./GameScreenMenu"
import { EditorScreenMenu } from "./EditorScreenMenu"
import { ClosedMenuOption, MenuOption, OpenMenuCallback } from "./types"
import { isMenuOptionEditor, isMenuOptionEditorParams, isMenuOptionGame, isMenuOptionGameParams, isMenuOptionMain, isMenuOptionOptions } from "./utils"
import { MENU_SWITCH_EVENT } from "./const"

interface Params extends SwitchObservableParams {
    menu: Exclude<MenuOption, ClosedMenuOption>
    openParentMenu: () => void
}
function MenuContent({menu, openMenu, openParentMenu}: Params) {
    // menus
    if (isMenuOptionMain(menu)) {
        return MainMenu({openMenu});
    }
    if (isMenuOptionGame(menu)) {
        return GameScreenMenu({openMenu, closeMenu: openParentMenu})
    }
    if (isMenuOptionEditor(menu)) {
        return EditorScreenMenu({openMenu, closeMenu: openParentMenu})
    }
    // submenus
    if (isMenuOptionGameParams(menu)) {
        return GameParamsMenu({openParentMenu})
    }
    if (isMenuOptionEditorParams(menu)) {
        return EditorParamsMenu({parent: menu.parent, openParentMenu})
    }
    if (isMenuOptionOptions(menu)) {
        return OptionsMenu({openParentMenu})
    }
    throw new Error('unknown menu type')
}


interface SwitchObservableParams {
    openMenu: OpenMenuCallback
    openParentMenu: () => void
}
export const MenuSwitchObservable = observable(MENU_SWITCH_EVENT, (params: SwitchObservableParams) => {
    const {menu} = globalStore
    if (menu.current === null) return null

    return Popup(
        Block(
            MenuContent({...params, menu}),
            {className: 'flex-column'}
        )
    )
})
