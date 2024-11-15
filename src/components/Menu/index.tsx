import { useCallback } from 'react';

import { Children } from 'components/types';
import { useEsc } from 'hooks/useEsc';

import { MenuComponent, MenuItemComponent } from './types';
import { useMenuStore } from './useMenuStore';

interface IProps {
    isOpen?: boolean;
    closeOnBackAction?: boolean;
    component: MenuComponent;
    item: MenuItemComponent;
    children: Children;
}

export function Menu({ isOpen, closeOnBackAction, item, children: topLevelMenu, ...props }: IProps) {
    const [store, setStore] = useMenuStore({ isOpen: !!isOpen, children: topLevelMenu, menuItemComponent: item });

    store.back = useCallback(() => {
        if (store.children !== topLevelMenu) {
            setStore({ children: topLevelMenu, menuStyle: undefined });
        } else if (closeOnBackAction) {
            // top level menu
            setStore({ isOpen: !store.isOpen, menuStyle: undefined });
        }
    }, [closeOnBackAction, setStore, store.children, store.isOpen, topLevelMenu]);

    useEsc(store.back);

    if (!store.isOpen) return null;

    return <props.component style={store.menuStyle}>{store.children}</props.component>;
}
