import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { useScreenStore } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { EditorParamsMenuItem } from './EditorParamsMenuItem';
import { NewGameMenu } from './NewGameMenu';
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

            <EditorParamsMenuItem title="Editor" />

            <MenuItem title="Options">
                <OptionsMenu onApply={() => {}} />
            </MenuItem>
        </Menu>
    );
}
