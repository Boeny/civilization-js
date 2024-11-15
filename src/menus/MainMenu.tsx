import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';
import { IEditorParamsMenuState } from 'types';

import { EditorParamsMenuItem } from './EditorParamsMenuItem';
import { NewGameMenu } from './NewGameMenu';
import { OptionsMenu } from './OptionsMenu';

interface IProps {
    createGameScreen: () => void;
    createEditorScreen: (params: IEditorParamsMenuState) => void;
    applyParams: () => void;
}
export function MainMenu({ createGameScreen, createEditorScreen, applyParams }: IProps) {
    return (
        <Menu
            isOpen
            component={MenuPopup}
            item={Button}
        >
            <MenuItem name="New Game">
                <NewGameMenu onPlay={createGameScreen} />
            </MenuItem>

            <EditorParamsMenuItem
                itemName="Editor"
                onSubmit={createEditorScreen}
            />

            <MenuItem name="Options">
                <OptionsMenu onApply={applyParams} />
            </MenuItem>
        </Menu>
    );
}
