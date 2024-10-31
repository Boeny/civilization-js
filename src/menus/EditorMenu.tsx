import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';

import { EditorParamsMenu } from './EditorParamsMenu';
import { IEditorParamsMenuState } from './EditorParamsMenu/store';
import { OptionsMenu } from './OptionsMenu';

interface IProps {
    onReload: () => void;
    createEditorScreen: (params: IEditorParamsMenuState) => void;
    applyParams: () => void;
    exitToMainMenu: () => void;
}
export function EditorMenu({ onReload, createEditorScreen, applyParams, exitToMainMenu }: IProps) {
    return (
        <Menu
            closeOnBackAction
            component={MenuPopup}
            item={Button}
        >
            <MenuItem
                name="Back to the editor"
                action="back"
            />
            <MenuItem
                name="Reload map"
                onClick={onReload}
                action="back"
            />

            <MenuItem name="New map">
                <EditorParamsMenu onSubmit={createEditorScreen} />
            </MenuItem>

            <MenuItem name="Editor options">
                <OptionsMenu onApply={applyParams} />
            </MenuItem>

            <MenuItem
                name="Back to main menu"
                onClick={exitToMainMenu}
            />
        </Menu>
    );
}
