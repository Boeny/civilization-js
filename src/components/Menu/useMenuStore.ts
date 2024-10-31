import { useEffect, useState } from 'react';

import { Children, MenuItemComponent } from './types';

interface MenuStore {
    isOpen: boolean;
    children: Children;
    back: () => void;
    menuItemComponent: MenuItemComponent;
}

let menuStore = {} as MenuStore;

const menuStoreUpdateStack: (() => void)[] = [];

function setMenuStore(data: Partial<MenuStore>) {
    menuStore = { ...menuStore, ...data };
    menuStoreUpdateStack.forEach((callback) => callback());
}

export function useMenuStore(defaultState?: Partial<MenuStore>): [MenuStore, (data: Partial<MenuStore>) => void] {
    const [, update] = useState(
        defaultState
            ? () => {
                  // init store - one time during first render
                  menuStore = { ...menuStore, ...defaultState };

                  return {};
              }
            : {},
    );

    useEffect(() => {
        // add state updater to the stack after mount
        function updateFunc() {
            update({});
        }
        menuStoreUpdateStack.push(updateFunc);

        // remove updateFunc from the stack before unmount
        return () => {
            const index = menuStoreUpdateStack.indexOf(updateFunc);
            menuStoreUpdateStack.splice(index, 1);
        };
    }, []);

    return [menuStore, setMenuStore];
}

export function useMenuStoreWithoutUpdate(): [MenuStore, (data: Partial<MenuStore>) => void] {
    return [menuStore, setMenuStore];
}
