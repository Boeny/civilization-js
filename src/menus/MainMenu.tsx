import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { resetEditorPage } from 'screens/EditorScreen/config';
import { screenStoreConfig } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { NewGameMenu } from './game/NewGameMenu';
import { OptionsMenu } from './OptionsMenu';

export function MainMenu() {
    const setScreen = screenStoreConfig.setStore;

    return (
        <Menu
            isOpen
            component={MenuPopup}
            item={Button}
        >
            <MenuItem title="New Game">
                <NewGameMenu onPlay={() => setScreen({ screen: SCREEN_TYPE.game })} />
            </MenuItem>

            <MenuItem
                title="Editor"
                onClick={() => {
                    resetEditorPage();
                    setScreen({ screen: SCREEN_TYPE.editor });
                }}
            />

            <MenuItem title="Options">
                <OptionsMenu onApply={() => {}} />
            </MenuItem>
        </Menu>
    );
}
