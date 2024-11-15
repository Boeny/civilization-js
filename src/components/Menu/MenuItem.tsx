import { CSSProperties, memo } from 'react';

import { Children } from 'components/types';

import { useMenuStoreWithoutUpdate } from './useMenuStore';

interface IProps {
    name: string;
    children?: Children;
    action?: 'back' | 'close';
    alignRight?: boolean;
    style?: CSSProperties;
    menuStyle?: CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
}
export const MenuItem = memo(({ name, children, action, alignRight, style, menuStyle, disabled, onClick }: IProps) => {
    const [store, setStore] = useMenuStoreWithoutUpdate();

    return (
        <div style={{ display: 'flex', justifyContent: alignRight ? 'flex-end' : undefined, ...style }}>
            <store.menuItemComponent
                disabled={disabled}
                onClick={() => {
                    onClick?.();

                    if (children) {
                        setStore({
                            children,
                            menuStyle,
                        });

                        return;
                    }
                    if (action === 'back') {
                        store.back();

                        return;
                    }
                    if (action === 'close') {
                        setStore({ isOpen: false, menuStyle: undefined });

                        return;
                    }
                }}
            >
                {name}
            </store.menuItemComponent>
        </div>
    );
});
