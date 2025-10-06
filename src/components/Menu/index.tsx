import { ReactNode, useCallback } from 'react';

import { useEsc } from 'hooks/useEsc';

import { MenuComponent, MenuItemComponent } from './types';
import { useMenuStore } from './useMenuStore';

interface IProps {
    isOpen?: boolean;
    toggleMenuOnBackAction?: boolean; // on top level only
    component: MenuComponent;
    item: MenuItemComponent;
    children: ReactNode; // top level children
    testId?: string;
}

export function Menu({ isOpen, toggleMenuOnBackAction, item, children: topLevelChildren, testId, ...props }: IProps) {
    const { store: menu, setStore: setMenu } = useMenuStore({
        isOpen: !!isOpen,
        children: topLevelChildren,
        menuItemComponent: item,
    });

    menu.toggle = useCallback(
        (show: boolean) => {
            setMenu({ isOpen: show, children: topLevelChildren, menuStyle: undefined });
        },
        [topLevelChildren],
    );

    menu.back = useCallback(() => {
        if (menu.children !== topLevelChildren) {
            // menu is NOT top level - make top level
            setMenu({ children: topLevelChildren, menuStyle: undefined });

            return;
        }

        if (toggleMenuOnBackAction) {
            menu.toggle(!menu.isOpen);
        }
    }, [menu.children, menu.isOpen, toggleMenuOnBackAction, topLevelChildren]);

    useEsc(menu.back);

    if (!menu.isOpen) {
        return null;
    }

    return (
        <props.component
            testId={testId}
            style={menu.menuStyle}
        >
            {menu.children}
        </props.component>
    );
}
