import { MENU_TYPE, IMenuOption } from './types';

export function getParentMenu(menu: IMenuOption): IMenuOption | null {
    // main menu has no parent
    if (menu.current === MENU_TYPE.main) {
        return null;
    }
    // if we close menu we can return to it
    if (menu.current === MENU_TYPE.gameScreen || menu.current === MENU_TYPE.editorScreen) {
        return { current: null, parent: menu.current };
    }

    // submenu and closed menu
    return { current: menu.parent, parent: null };
}
