import { useCallback, useMemo, useState } from 'react';

import { EditorMenu } from 'menus/EditorMenu';
import { DEFAULT_EDITOR_PARAMS, IEditorParamsMenuState } from 'menus/EditorParamsMenu/store';
import { GameMenu } from 'menus/GameMenu';
import { MainMenu } from 'menus/MainMenu';
import { EditorScreen } from 'screens/EditorScreen';
import { GameScreen } from 'screens/GameScreen';

enum SCREEN_TYPE {
    game,
    editor,
}

export function App() {
    const [screen, setScreen] = useState<SCREEN_TYPE | null>(null);
    const [editorParams, setEditorParams] = useState<IEditorParamsMenuState>(DEFAULT_EDITOR_PARAMS);
    const [reloadFlag, setReloadFlag] = useState(false);

    const switchScreen = useCallback(
        (screenType: SCREEN_TYPE | null) => {
            setScreen(screenType);
            setReloadFlag(!reloadFlag);
        },
        [reloadFlag],
    );

    const createEditorScreen = useCallback(
        (params: IEditorParamsMenuState) => {
            setEditorParams(params);
            switchScreen(SCREEN_TYPE.editor);
        },
        [switchScreen],
    );

    const menuElement = useMemo(() => {
        if (screen === SCREEN_TYPE.game) {
            return (
                <GameMenu
                    onReload={() => setReloadFlag(!reloadFlag)}
                    createGameScreen={() => switchScreen(SCREEN_TYPE.game)}
                    applyParams={() => {}}
                    exitToMainMenu={() => switchScreen(null)}
                />
            );
        }
        if (screen === SCREEN_TYPE.editor) {
            return (
                <EditorMenu
                    onReload={() => setReloadFlag(!reloadFlag)}
                    createEditorScreen={createEditorScreen}
                    applyParams={() => {}}
                    exitToMainMenu={() => switchScreen(null)}
                />
            );
        }

        return (
            <MainMenu
                createGameScreen={() => switchScreen(SCREEN_TYPE.game)}
                createEditorScreen={createEditorScreen}
                applyParams={() => {}}
            />
        );
    }, [screen, createEditorScreen, switchScreen, reloadFlag]);

    const screenElement = useMemo(() => {
        if (screen === SCREEN_TYPE.game) {
            return <GameScreen key={String(reloadFlag)} />;
        }

        if (screen === SCREEN_TYPE.editor) {
            return (
                <EditorScreen
                    key={String(reloadFlag)}
                    {...editorParams}
                />
            );
        }

        return null;
    }, [editorParams, reloadFlag, screen]);

    return (
        <>
            {menuElement}
            {screenElement}
        </>
    );
}
