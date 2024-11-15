import { useCallback, useMemo, useState } from 'react';

import { EditorMenu } from 'menus/EditorMenu';
import { GameMenu } from 'menus/GameMenu';
import { MainMenu } from 'menus/MainMenu';
import { EditorScreen } from 'screens/EditorScreen';
import { GameScreen } from 'screens/GameScreen';
import { IEditorParamsMenuState } from 'types';

enum SCREEN_TYPE {
    game,
    editor,
}

export function App() {
    const [screen, setScreen] = useState<SCREEN_TYPE | null>(null);
    const [editorParams, setEditorParams] = useState<IEditorParamsMenuState | null>(null);
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

        if (screen === SCREEN_TYPE.editor && editorParams) {
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
