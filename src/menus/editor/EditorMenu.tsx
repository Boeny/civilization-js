import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { useEditorReset } from 'screens/EditorScreen/hooks/useEditorReset';
import { useScreenStore } from 'screenStore';
import { SCREEN_TYPE } from 'types';

import { OptionsMenu } from '../OptionsMenu';

export function EditorMenu() {
    const setScreen = useScreenStore().setStore;
    const reset = useEditorReset();

    return (
        <Menu
            toggleMenuOnBackAction
            component={MenuPopup}
            item={Button}
        >
            <MenuItem
                title="Back to the editor"
                action="back"
            />

            <MenuItem
                title="New map"
                onClick={reset}
                action="close"
            />

            <MenuItem title="Editor options">
                <OptionsMenu onApply={() => {}} />
            </MenuItem>

            <MenuItem
                title="Back to main menu"
                onClick={() => setScreen({ screen: SCREEN_TYPE.main })}
            />
        </Menu>
    );
}
