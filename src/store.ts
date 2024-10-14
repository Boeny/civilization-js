import { MAIN_MENU_OPTION } from 'menus/const';
import { IMenuOption } from 'menus/types';
import { SCREEN_TYPE } from 'types';

interface IState {
    screen: SCREEN_TYPE | null;
    menu: IMenuOption;
}

export const DEFAULT_MENU_STATE: IState = {
    screen: null,
    menu: MAIN_MENU_OPTION,
};
