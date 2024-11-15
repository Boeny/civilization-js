import { CSSProperties } from 'react';

import { Children } from 'components/types';
import { useStore } from 'hooks/useStore';

import { MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: Children;
    back: () => void;
    menuItemComponent: MenuItemComponent;
    menuStyle?: CSSProperties;
}

const [useMenuStore, useMenuStoreWithoutUpdate] = useStore({} as IStore);

export { useMenuStore, useMenuStoreWithoutUpdate };
