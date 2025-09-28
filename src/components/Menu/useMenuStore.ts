import { CSSProperties, ReactNode } from 'react';

import { Button } from 'components/Button';
import { createStoreHook } from 'hooks/createStoreHook';

import { MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: ReactNode;
    back: () => void;
    toggle: (isOpen: boolean) => void;
    menuItemComponent: MenuItemComponent;
    menuStyle?: CSSProperties;
}

const [useMenuObservableStore, useMenuStore] = createStoreHook<IStore>({
    isOpen: false,
    children: null,
    back: () => {},
    toggle: () => {},
    menuItemComponent: Button,
});

export { useMenuObservableStore, useMenuStore };
