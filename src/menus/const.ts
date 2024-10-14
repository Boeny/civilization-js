import { MENU_TYPE, IMainMenuOption, IClosedMenuOption } from './types';

export const MAIN_MENU_OPTION: IMainMenuOption = {
    current: MENU_TYPE.main,
    parent: null,
};

export const GAME_MENU_OPTION_CLOSED: IClosedMenuOption = {
    current: null,
    parent: MENU_TYPE.gameScreen,
};

export const EDITOR_MENU_OPTION_CLOSED: IClosedMenuOption = {
    current: null,
    parent: MENU_TYPE.editorScreen,
};
