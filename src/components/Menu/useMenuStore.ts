import { useStore } from 'hooks/useStore';

import { Children, MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: Children;
    back: () => void;
    menuItemComponent: MenuItemComponent;
}

const [useMenuStore, useMenuStoreWithoutUpdate] = useStore({} as IStore);

export { useMenuStore, useMenuStoreWithoutUpdate };
