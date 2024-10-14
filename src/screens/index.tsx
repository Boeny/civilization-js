/* eslint-disable @typescript-eslint/no-unused-vars */
import './styles.css';
import { memo } from 'react';

import { IEditorParamsMenuState } from 'menus/EditorParamsMenu/store';
import { SCREEN_TYPE } from 'types';

import { EditorScreen } from './EditorScreen';
import { GameScreen } from './GameScreen';

interface IParams {
    screen: SCREEN_TYPE | null;
    editorParams: IEditorParamsMenuState;
}
export const Screen = memo(({ screen, editorParams }: IParams) => {
    if (screen === null) return null;

    switch (screen) {
        case SCREEN_TYPE.game:
            return <GameScreen />;
        // case SCREEN_TYPE.editor:
        //     return <EditorScreen {...editorParams} />;
        default:
            throw new Error('unknown screen type');
    }
});
