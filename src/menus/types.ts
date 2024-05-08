export enum MENU_TYPE {
    main,
    gameParams,
    editorParams,
    options,
    editorScreen,
    gameScreen,
}

export interface ClosedMenuOption {
    current: null
    parent: MENU_TYPE.gameScreen | MENU_TYPE.editorScreen
}

export interface MainMenuOption {
    current: MENU_TYPE.main
    parent: null
}

export interface GameMenuOption {
    current: MENU_TYPE.gameScreen
    parent: null
}

export interface EditorMenuOption {
    current: MENU_TYPE.editorScreen
    parent: null
}

export interface GameParamsMenuOption {
    current: MENU_TYPE.gameParams
    parent: MENU_TYPE.main | MENU_TYPE.gameScreen
}

export interface EditorParamsMenuOption {
    current: MENU_TYPE.editorParams
    parent: MENU_TYPE.main | MENU_TYPE.editorScreen
}

export interface OptionsMenuOption {
    current: MENU_TYPE.options
    parent: MENU_TYPE.main | MENU_TYPE.gameScreen | MENU_TYPE.editorScreen
}

export type MenuOption = ClosedMenuOption | MainMenuOption | GameMenuOption | EditorMenuOption | GameParamsMenuOption | EditorParamsMenuOption | OptionsMenuOption

export type OpenMenuCallback = (menu: MenuOption) => void
