import { useCallback } from 'react';

import { Children, MenuItemComponent } from './types';
import { useEsc } from './useEsc';
import { useMenuStore } from './useMenuStore';

interface IProps {
    isOpen?: boolean;
    closeOnBackAction?: boolean;
    component: ({ children }: { children: Children }) => JSX.Element;
    item: MenuItemComponent;
    children: Children;
}

export function Menu({ isOpen, closeOnBackAction, component: MenuComponent, item, children: topLevelMenu }: IProps) {
    const [store, setStore] = useMenuStore({ isOpen: !!isOpen, children: topLevelMenu, menuItemComponent: item });

    store.back = useCallback(() => {
        if (store.children !== topLevelMenu) {
            setStore({ children: topLevelMenu });
        } // top level menu
        else if (closeOnBackAction) {
            setStore({ isOpen: !store.isOpen });
        }
    }, [closeOnBackAction, setStore, store.children, store.isOpen, topLevelMenu]);

    useEsc(store.back);

    if (!store.isOpen) return null;

    return <MenuComponent>{store.children}</MenuComponent>;
}
