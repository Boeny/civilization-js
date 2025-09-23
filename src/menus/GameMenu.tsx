import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { useScreenStore } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { NewGameMenu } from './NewGameMenu';
import { OptionsMenu } from './OptionsMenu';

export function GameMenu() {
    const [, setScreen] = useScreenStore();

    return (
        <Menu
            closeOnBackAction
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
                <NewGameMenu onPlay={() => setScreen({ screen: SCREEN_TYPE.game })} />
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
