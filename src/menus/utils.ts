import { EditorMenuOption, EditorParamsMenuOption, GameMenuOption, GameParamsMenuOption, MENU_TYPE, MainMenuOption, MenuOption, OptionsMenuOption } from "./types"

// menus
export function isMenuOptionMain(menu: MenuOption): menu is MainMenuOption {
    return menu.current === MENU_TYPE.main
}

export function isMenuOptionGame(menu: MenuOption): menu is GameMenuOption {
    return menu.current === MENU_TYPE.gameScreen
}

export function isMenuOptionEditor(menu: MenuOption): menu is EditorMenuOption {
    return menu.current === MENU_TYPE.editorScreen
}

// submenus
export function isMenuOptionGameParams(menu: MenuOption): menu is GameParamsMenuOption {
    return menu.current === MENU_TYPE.gameParams
}

export function isMenuOptionEditorParams(menu: MenuOption): menu is EditorParamsMenuOption {
    return menu.current === MENU_TYPE.editorParams
}

export function isMenuOptionOptions(menu: MenuOption): menu is OptionsMenuOption {
    return menu.current === MENU_TYPE.options
}

export function getParentMenu(menu: MenuOption): MenuOption | null {
    if (isMenuOptionMain(menu)) {
        return null
    }
    if (isMenuOptionGame(menu) || isMenuOptionEditor(menu)) {
        return {current: null, parent: menu.current}
    }
    // submenus and closed menu
    return {current: menu.parent, parent: null}
}
