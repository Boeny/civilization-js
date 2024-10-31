import { Button } from 'components/Button';
import { Menu } from 'components/Menu';
import { MenuItem } from 'components/Menu/MenuItem';
import { MenuPopup } from 'components/MenuPopup';

import { NewGameMenu } from './NewGameMenu';
import { OptionsMenu } from './OptionsMenu';

interface IProps {
    onReload: () => void;
    createGameScreen: () => void;
    applyParams: () => void;
    exitToMainMenu: () => void;
}
export function GameMenu({ onReload, createGameScreen, applyParams, exitToMainMenu }: IProps) {
    return (
        <Menu
            closeOnBackAction
            component={MenuPopup}
            item={Button}
        >
            <MenuItem
                name="Back to the game"
                action="back"
            />
            <MenuItem
                name="Restart"
                onClick={onReload}
                action="back"
            />

            <MenuItem name="New Game">
                <NewGameMenu onPlay={createGameScreen} />
            </MenuItem>

            <MenuItem name="Options">
                <OptionsMenu onApply={applyParams} />
            </MenuItem>

            <MenuItem
                name="Back to main menu"
                onClick={exitToMainMenu}
            />
        </Menu>
    );
}
