import { useCallback } from 'react';

import { MENU_TYPE, FOpenMenuCallback } from './types';

interface IParams {
    openMenu: FOpenMenuCallback;
}
export const MainMenu = ({ openMenu }: IParams) => {
    const switchTo = useCallback(
        (current: MENU_TYPE.gameParams | MENU_TYPE.editorParams | MENU_TYPE.options) => {
            openMenu({ current, parent: MENU_TYPE.main });
        },
        [openMenu],
    );

    return (
        <>
            <button onClick={() => switchTo(MENU_TYPE.gameParams)}>New Game</button>
            <button onClick={() => switchTo(MENU_TYPE.editorParams)}>Editor</button>
            <button onClick={() => switchTo(MENU_TYPE.options)}>Options</button>
        </>
    );
};
