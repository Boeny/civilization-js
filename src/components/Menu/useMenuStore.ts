import { CSSProperties, ReactNode } from 'react';

import { useStore } from 'hooks/useStore';

import { MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: ReactNode;
    back: () => void;
    menuItemComponent?: MenuItemComponent | null;
    menuStyle?: CSSProperties;
}

const [useMenuObservableStore, useMenuStore] = useStore<IStore>({
    isOpen: false,
    children: null,
    back: () => {},
});

export { useMenuObservableStore, useMenuStore };
