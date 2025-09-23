import { ReactNode, useEffect } from 'react';

import { useEsc } from 'hooks/useEsc';

import { MenuComponent, MenuItemComponent } from './types';
import { useMenuObservableStore } from './useMenuStore';

interface IProps {
    isOpen?: boolean;
    closeOnBackAction?: boolean;
    component: MenuComponent;
    item: MenuItemComponent;
    children: ReactNode;
}

export function Menu({ isOpen, closeOnBackAction, item, children: topLevelMenu, ...props }: IProps) {
    const [menu, setMenu] = useMenuObservableStore();

    useEffect(() => {
        setMenu({
            isOpen: !!isOpen,
            children: topLevelMenu,
            menuItemComponent: item,
            back: () => {
                if (menu.children !== topLevelMenu) {
                    setMenu({ children: topLevelMenu, menuStyle: undefined });

                    return;
                }

                if (closeOnBackAction) {
                    // top level menu
                    setMenu({ isOpen: !menu.isOpen, menuStyle: undefined });
                }
            },
        });
    }, []);

    useEsc(menu.back);

    if (!menu.isOpen) return null;

    return <props.component style={menu.menuStyle}>{menu.children}</props.component>;
}
