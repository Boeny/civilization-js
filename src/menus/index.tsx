import { memo } from 'react';

import { Block } from 'components/Block';
import { Popup } from 'components/Popup';

import { GAME_MENU_OPTION_CLOSED, EDITOR_MENU_OPTION_CLOSED } from './const';
import { EditorParamsMenu } from './EditorParamsMenu';
import { IEditorParamsMenuState } from './EditorParamsMenu/store';
import { EditorScreenMenu } from './EditorScreenMenu';
import { GameParamsMenu } from './GameParamsMenu';
import { GameScreenMenu } from './GameScreenMenu';
import { MainMenu } from './MainMenu';
import { OptionsMenu } from './OptionsMenu';
import { IClosedMenuOption, IMenuOption, FOpenMenuCallback, MENU_TYPE } from './types';

interface IMenuContentProps extends IMenuProps {
    menu: Exclude<IMenuOption, IClosedMenuOption>;
}
const MenuContent = memo(
    ({
        menu,
        openMenu,
        openParentMenu,
        createGameScreen,
        createEditorScreen,
        exitToMainMenu,
        reloadGameScreen,
        reloadEditorScreen,
    }: IMenuContentProps) => {
        switch (menu.current) {
            case MENU_TYPE.main:
                return <MainMenu openMenu={openMenu} />;
            case MENU_TYPE.gameScreen:
                return (
                    <GameScreenMenu
                        openMenu={openMenu}
                        closeMenu={openParentMenu}
                        exitToMainMenu={exitToMainMenu}
                        onReload={reloadGameScreen}
                    />
                );
            case MENU_TYPE.editorScreen:
                return (
                    <EditorScreenMenu
                        openMenu={openMenu}
                        closeMenu={openParentMenu}
                        exitToMainMenu={exitToMainMenu}
                        onReload={reloadEditorScreen}
                    />
                );
            // submenu
            case MENU_TYPE.gameParams:
                return (
                    <GameParamsMenu
                        openParentMenu={openParentMenu}
                        onSubmit={() => {
                            openMenu(GAME_MENU_OPTION_CLOSED);
                            createGameScreen();
                        }}
                    />
                );
            case MENU_TYPE.editorParams:
                return (
                    <EditorParamsMenu
                        parent={menu.parent}
                        openParentMenu={openParentMenu}
                        onSubmit={(params) => {
                            openMenu(EDITOR_MENU_OPTION_CLOSED);
                            createEditorScreen(params);
                        }}
                    />
                );
            case MENU_TYPE.options:
                return <OptionsMenu openParentMenu={openParentMenu} />;
            default:
                throw new Error('unknown menu type');
        }
    },
);

interface IMenuProps {
    menu: IMenuOption;
    openMenu: FOpenMenuCallback;
    openParentMenu: () => void;
    exitToMainMenu: () => void;
    createGameScreen: () => void;
    createEditorScreen: (params: IEditorParamsMenuState) => void;
    reloadGameScreen: () => void;
    reloadEditorScreen: () => void;
}
export const Menu = ({ menu, ...props }: IMenuProps) => {
    if (menu.current === null) return null;

    return (
        <Popup>
            <Block alignedVertically>
                <MenuContent
                    {...props}
                    menu={menu}
                />
            </Block>
        </Popup>
    );
};
