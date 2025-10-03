import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { screenStoreConfig } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { OptionsMenu } from '../OptionsMenu';

import { NewGameMenu } from './NewGameMenu';

export function GameMenu() {
    const setScreen = screenStoreConfig.setStore;

    return (
        <Menu
            toggleMenuOnBackAction
            component={MenuPopup}
            item={Button}
        >
            <MenuItem
                title="Back to the game"
                action="back"
            />

            <MenuItem
                title="Restart"
                onClick={() => {}}
                action="back"
            />

            <MenuItem title="New Game">
                <NewGameMenu onPlay={() => {}} />
            </MenuItem>

            <MenuItem title="Options">
                <OptionsMenu onApply={() => {}} />
            </MenuItem>

            <MenuItem
                title="Back to main menu"
                onClick={() => setScreen({ screen: SCREEN_TYPE.main })}
            />
        </Menu>
    );
}
