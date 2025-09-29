import { EditorMenu } from 'menus/editor/EditorMenu';
import { GameMenu } from 'menus/game/GameMenu';
import { MainMenu } from 'menus/MainMenu';
import { EditorScreen } from 'screens/EditorScreen';
import { GameScreen } from 'screens/GameScreen';
import { useScreenObservableStore } from 'screenStore';
import { SCREEN_TYPE } from 'types';

const menuElement = {
    [SCREEN_TYPE.game]: <GameMenu />,
    [SCREEN_TYPE.editor]: <EditorMenu />,
    [SCREEN_TYPE.main]: <MainMenu />,
};

const screenElement = {
    [SCREEN_TYPE.game]: <GameScreen />,
    [SCREEN_TYPE.editor]: <EditorScreen />,
    [SCREEN_TYPE.main]: null,
};

export function App() {
    const [{ screen }] = useScreenObservableStore();

    return (
        <>
            {menuElement[screen]}
            {screenElement[screen]}
        </>
    );
}
