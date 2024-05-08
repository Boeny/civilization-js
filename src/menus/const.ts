import { EditorMenuOption, GameMenuOption, MENU_TYPE, MainMenuOption } from "./types"

export const MENU_SWITCH_EVENT = 'switch-menu'

export const MAIN_MENU_OPTION: MainMenuOption = {
    current: MENU_TYPE.main,
    parent: null,
}

export const GAME_MENU_OPTION: GameMenuOption = {
    current: MENU_TYPE.gameScreen,
    parent: null,
}

export const EDITOR_MENU_OPTION: EditorMenuOption = {
    current: MENU_TYPE.editorScreen,
    parent: null,
}
