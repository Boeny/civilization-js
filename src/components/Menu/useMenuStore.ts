import { CSSProperties, ReactNode } from 'react';

import { Button } from 'components/Button';
import { useStore } from 'hooks/useStore';

import { MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: ReactNode;
    back: () => void;
    menuItemComponent: MenuItemComponent;
    menuStyle?: CSSProperties;
}

const [useMenuObservableStore, useMenuStore] = useStore<IStore>({
    isOpen: false,
    children: null,
    back: () => {},
    menuItemComponent: Button,
});

export { useMenuObservableStore, useMenuStore };
