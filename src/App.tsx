import { useCallback, useEffect, useState } from 'react';

import { Menu } from 'menus';
import { EDITOR_MENU_OPTION_CLOSED, GAME_MENU_OPTION_CLOSED } from 'menus/const';
import { DEFAULT_EDITOR_PARAMS, IEditorParamsMenuState } from 'menus/EditorParamsMenu/store';
import { IMenuOption } from 'menus/types';
import { getParentMenu } from 'menus/utils';
import { Screen } from 'screens';
import { DEFAULT_MENU_STATE } from 'store';
import { KEY_CODE, SCREEN_TYPE } from 'types';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const callbackContainerForMount = { openParentMenu: () => {} };

export function App() {
    const [menu, setMenu] = useState<IMenuOption>(DEFAULT_MENU_STATE.menu);
    const [screen, setScreen] = useState<SCREEN_TYPE | null>(null);
    const [editorParams, setEditorParams] = useState<IEditorParamsMenuState>(DEFAULT_EDITOR_PARAMS);
    const [reloadFlag, setReloadFlag] = useState(false);

    const setDefaultstate = useCallback(() => {
        setMenu(DEFAULT_MENU_STATE.menu);
        setScreen(DEFAULT_MENU_STATE.screen);
    }, []);

    callbackContainerForMount.openParentMenu = useCallback(() => {
        const parentMenu = getParentMenu(menu);
        if (parentMenu) setMenu(parentMenu);
    }, [menu]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.key === KEY_CODE.esc) {
                callbackContainerForMount.openParentMenu();
            }
        });
    }, []);

    const createEditorScreen = useCallback(
        (params: IEditorParamsMenuState) => {
            setEditorParams(params);
            setScreen(SCREEN_TYPE.editor);
            setReloadFlag(!reloadFlag);
        },
        [reloadFlag],
    );

    const createGameScreen = useCallback(() => {
        setScreen(SCREEN_TYPE.game);
        setReloadFlag(!reloadFlag);
    }, [reloadFlag]);

    const reloadGameScreen = useCallback(() => {
        setMenu(GAME_MENU_OPTION_CLOSED);
        setReloadFlag(!reloadFlag);
    }, [reloadFlag]);

    const reloadEditorScreen = useCallback(() => {
        setMenu(EDITOR_MENU_OPTION_CLOSED);
        setReloadFlag(!reloadFlag);
    }, [reloadFlag]);

    return (
        <>
            <Menu
                menu={menu}
                openMenu={setMenu}
                openParentMenu={callbackContainerForMount.openParentMenu}
                exitToMainMenu={setDefaultstate}
                createEditorScreen={createEditorScreen}
                createGameScreen={createGameScreen}
                reloadGameScreen={reloadGameScreen}
                reloadEditorScreen={reloadEditorScreen}
            />
            <Screen
                key={String(reloadFlag)}
                screen={screen}
                editorParams={editorParams}
            />
        </>
    );
}
