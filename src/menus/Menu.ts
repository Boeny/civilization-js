import { observer } from "modules/observer"
import { IClosedMenuOption, IMenuOption, FOpenMenuCallback } from "./types"
import { MENU_SWITCH_EVENT } from "./const"
import { isMenuOptionEditor, isMenuOptionEditorParams, isMenuOptionGame, isMenuOptionGameParams, isMenuOptionMain, isMenuOptionOptions } from "./utils"
import { globalStore } from "store"

import { Block } from "components/Block"
import { Popup } from "components/Popup"
import { MainMenu } from "./MainMenu"
import { GameParamsMenu } from "./GameParamsMenu"
import { EditorParamsMenu } from "./EditorParamsMenu"
import { OptionsMenu } from "./OptionsMenu"
import { GameScreenMenu } from "./GameScreenMenu"
import { EditorScreenMenu } from "./EditorScreenMenu"

interface IParams extends ISwitchParams {
    menu: Exclude<IMenuOption, IClosedMenuOption>
    openParentMenu: () => void
}
function MenuContent({menu, openMenu, openParentMenu}: IParams) {
    // menus
    if (isMenuOptionMain(menu)) {
        return MainMenu({openMenu})
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


interface ISwitchParams {
    openMenu: FOpenMenuCallback
    openParentMenu: () => void
}
export const MenuSwitchObserver = observer(MENU_SWITCH_EVENT, (params: ISwitchParams) => {
    const {menu} = globalStore
    if (menu.current === null) return null

    return Popup(
        Block(
            MenuContent({...params, menu}),
            {className: 'flex-column'}
        )
    )
})
