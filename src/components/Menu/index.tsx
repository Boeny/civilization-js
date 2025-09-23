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

export function Menu({ isOpen, closeOnBackAction, item, children: topLevelMenu, ...props }: IProps) {
    const [store, setStore] = useMenuObservableStore({ isOpen: !!isOpen, children: topLevelMenu, menuItemComponent: item });

    store.back = () => {
        if (store.children !== topLevelMenu) {
            setStore({ children: topLevelMenu, menuStyle: undefined });

            return;
        }

        if (closeOnBackAction) {
            // top level menu
            setStore({ isOpen: !store.isOpen, menuStyle: undefined });
        }
    };

    useEsc(store.back);

    if (!store.isOpen) return null;

    return <props.component style={store.menuStyle}>{store.children}</props.component>;
}
