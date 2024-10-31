import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';

import { EditorParamsMenu } from './EditorParamsMenu';
import { IEditorParamsMenuState } from './EditorParamsMenu/store';
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

            <MenuItem name="Editor">
                <EditorParamsMenu onSubmit={createEditorScreen} />
            </MenuItem>

            <MenuItem name="Options">
                <OptionsMenu onApply={applyParams} />
            </MenuItem>
        </Menu>
    );
}
