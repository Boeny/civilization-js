import { useStore } from 'hoc/useStore';

import { Children, MenuItemComponent } from './types';

interface IStore {
    isOpen: boolean;
    children: Children;
    back: () => void;
    menuItemComponent: MenuItemComponent;
}

const store = {} as IStore;

const [useMenuStore, useMenuStoreWithoutUpdate] = useStore(store);

export { useMenuStore, useMenuStoreWithoutUpdate };
