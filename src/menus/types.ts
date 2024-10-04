export enum MENU_TYPE {
    main,
    gameParams,
    editorParams,
    options,
    editorScreen,
    gameScreen,
}

export interface IClosedMenuOption {
    current: null
    parent: MENU_TYPE.gameScreen | MENU_TYPE.editorScreen
}

export interface IMainMenuOption {
    current: MENU_TYPE.main
    parent: null
}

export interface IGameMenuOption {
    current: MENU_TYPE.gameScreen
    parent: null
}

export interface IEditorMenuOption {
    current: MENU_TYPE.editorScreen
    parent: null
}

export interface IGameParamsMenuOption {
    current: MENU_TYPE.gameParams
    parent: MENU_TYPE.main | MENU_TYPE.gameScreen
}

export interface IEditorParamsMenuOption {
    current: MENU_TYPE.editorParams
    parent: MENU_TYPE.main | MENU_TYPE.editorScreen
}

export interface IOptionsMenuOption {
    current: MENU_TYPE.options
    parent: MENU_TYPE.main | MENU_TYPE.gameScreen | MENU_TYPE.editorScreen
}

export type IMenuOption = IClosedMenuOption | IMainMenuOption | IGameMenuOption | IEditorMenuOption | IGameParamsMenuOption | IEditorParamsMenuOption | IOptionsMenuOption

export type FOpenMenuCallback = (menu: IMenuOption) => void
