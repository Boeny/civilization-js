import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { useScreenStore } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { NewGameMenu } from './game/NewGameMenu';
import { OptionsMenu } from './OptionsMenu';

export function MainMenu() {
    const [, setScreen] = useScreenStore();

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
                onClick={() => setScreen({ screen: SCREEN_TYPE.editor })}
            />

            <MenuItem title="Options">
                <OptionsMenu onApply={() => {}} />
            </MenuItem>
        </Menu>
    );
}
