import { MENU_TYPE, FOpenMenuCallback } from './types';

interface IParams {
    openMenu: FOpenMenuCallback;
    closeMenu: () => void;
    exitToMainMenu: () => void;
    onReload: () => void;
}
export const GameScreenMenu = ({ openMenu, closeMenu, exitToMainMenu, onReload }: IParams) => {
    const switchTo = (current: MENU_TYPE.gameParams | MENU_TYPE.options) => {
        openMenu({ current, parent: MENU_TYPE.gameScreen });
    };

    return (
        <>
            <button onClick={closeMenu}>Back to the game</button>
            <button onClick={onReload}>Restart</button>
            <button onClick={() => switchTo(MENU_TYPE.gameParams)}>New game</button>
            <button onClick={() => switchTo(MENU_TYPE.options)}>Options</button>
            <button onClick={exitToMainMenu}>Back to main menu</button>
        </>
    );
};
