import { memo } from 'react';

import { Children } from './types';
import { useMenuStoreWithoutUpdate } from './useMenuStore';

interface IProps {
    name: string;
    children?: Children;
    action?: 'back' | 'close';
    onClick?: () => void;
}
export const MenuItem = memo(({ name, children, action, onClick }: IProps) => {
    const [store, setStore] = useMenuStoreWithoutUpdate();

    return (
        <store.menuItemComponent
            onClick={() => {
                onClick?.();

                if (children) {
                    setStore({ children });

                    return;
                }
                if (action === 'back') {
                    store.back();

                    return;
                }
                if (action === 'close') {
                    setStore({ isOpen: false });

                    return;
                }
            }}
        >
            {name}
        </store.menuItemComponent>
    );
});
