import { useCallback } from 'react';

import { MENU_TYPE, FOpenMenuCallback } from './types';

interface IParams {
    openMenu: FOpenMenuCallback;
    closeMenu: () => void;
    exitToMainMenu: () => void;
    onReload: () => void;
}
export function EditorScreenMenu({ openMenu, closeMenu, exitToMainMenu, onReload }: IParams) {
    const switchTo = useCallback(
        (current: MENU_TYPE.editorParams | MENU_TYPE.options) => {
            openMenu({ current, parent: MENU_TYPE.editorScreen });
        },
        [openMenu],
    );

    return (
        <>
            <button onClick={closeMenu}>Back to editor</button>
            <button onClick={onReload}>Reload map</button>
            <button onClick={() => switchTo(MENU_TYPE.editorParams)}>New map</button>
            <button onClick={() => switchTo(MENU_TYPE.options)}>Options</button>
            <button onClick={exitToMainMenu}>Back to main menu</button>
        </>
    );
}
