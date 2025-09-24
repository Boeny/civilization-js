import { ReactNode } from 'react';

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

export function Menu({ isOpen, closeOnBackAction, item, children, ...props }: IProps) {
    const [menu, setMenu] = useMenuObservableStore({
        isOpen: !!isOpen,
        children,
        menuItemComponent: item,
    });

    menu.back = () => {
        if (menu.children !== children) {
            setMenu({ children, menuStyle: undefined });

            return;
        }

        if (closeOnBackAction) {
            // top level menu
            setMenu({ isOpen: !menu.isOpen, menuStyle: undefined });
        }
    };

    useEsc(menu.back);

    if (!menu.isOpen) return null;

    return <props.component style={menu.menuStyle}>{menu.children}</props.component>;
}
