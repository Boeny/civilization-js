import { IEditorMenuOption, IEditorParamsMenuOption, IGameMenuOption, IGameParamsMenuOption, MENU_TYPE, IMainMenuOption, IMenuOption, IOptionsMenuOption } from "./types"

// menus
export function isMenuOptionMain(menu: IMenuOption): menu is IMainMenuOption {
    return menu.current === MENU_TYPE.main
}

export function isMenuOptionGame(menu: IMenuOption): menu is IGameMenuOption {
    return menu.current === MENU_TYPE.gameScreen
}

export function isMenuOptionEditor(menu: IMenuOption): menu is IEditorMenuOption {
    return menu.current === MENU_TYPE.editorScreen
}

// submenus
export function isMenuOptionGameParams(menu: IMenuOption): menu is IGameParamsMenuOption {
    return menu.current === MENU_TYPE.gameParams
}

export function isMenuOptionEditorParams(menu: IMenuOption): menu is IEditorParamsMenuOption {
    return menu.current === MENU_TYPE.editorParams
}

export function isMenuOptionOptions(menu: IMenuOption): menu is IOptionsMenuOption {
    return menu.current === MENU_TYPE.options
}

export function getParentMenu(menu: IMenuOption): IMenuOption | null {
    if (isMenuOptionMain(menu)) {
        return null
    }
    if (isMenuOptionGame(menu) || isMenuOptionEditor(menu)) {
        return {current: null, parent: menu.current}
    }
    // submenus and closed menu
    return {current: menu.parent, parent: null}
}
