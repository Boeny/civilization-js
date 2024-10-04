import { IEditorMenuOption, IGameMenuOption, MENU_TYPE, IMainMenuOption } from "./types"

export const MENU_SWITCH_EVENT = 'switch-menu'

export const MAIN_MENU_OPTION: IMainMenuOption = {
    current: MENU_TYPE.main,
    parent: null,
}

export const GAME_MENU_OPTION: IGameMenuOption = {
    current: MENU_TYPE.gameScreen,
    parent: null,
}

export const EDITOR_MENU_OPTION: IEditorMenuOption = {
    current: MENU_TYPE.editorScreen,
    parent: null,
}
