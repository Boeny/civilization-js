import { CSSProperties, ReactNode } from 'react';

import { useStore } from 'hooks/useStore';

import { MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: ReactNode;
    back: () => void;
    menuItemComponent: MenuItemComponent;
    menuStyle?: CSSProperties;
}

const [useMenuObservableStore, useMenuStore] = useStore<IStore>({} as any);

export { useMenuObservableStore, useMenuStore };
