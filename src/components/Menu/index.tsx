import { ReactNode, useCallback } from 'react';

import { useEsc } from 'hooks/useEsc';

import { MenuComponent, MenuItemComponent } from './types';
import { useMenuObservableStore } from './useMenuStore';

interface IProps {
    isOpen?: boolean;
    toggleMenuOnBackAction?: boolean; // on top level only
    component: MenuComponent;
    item: MenuItemComponent;
    children: ReactNode; // top level children
    testId?: string;
}

export function Menu({ isOpen, toggleMenuOnBackAction, item, children: topLevelChildren, testId, ...props }: IProps) {
    const [menu, setMenu] = useMenuObservableStore({
        isOpen: !!isOpen,
        children: topLevelChildren,
        menuItemComponent: item,
    });

    menu.toggle = useCallback((show: boolean) => {
        setMenu({ isOpen: show, children: topLevelChildren, menuStyle: undefined });
    }, []);

    menu.back = useCallback(() => {
        if (menu.children !== topLevelChildren) {
            // menu is NOT top level - make top level
            setMenu({ children: topLevelChildren, menuStyle: undefined });

            return;
        }

        if (toggleMenuOnBackAction) {
            menu.toggle(!menu.isOpen);
        }
    }, [menu.children, menu.isOpen]);

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
