import { CSSProperties, ReactNode } from 'react';

import { useMenuStore } from './useMenuStore';

interface IProps {
    title: string;
    children?: ReactNode;
    action?: 'back' | 'close';
    alignRight?: boolean;
    style?: CSSProperties;
    menuStyle?: CSSProperties;
    disabled?: boolean;
    onClick?: () => void;
}
export const MenuItem = ({ title, children, action, alignRight, style, menuStyle, disabled, onClick }: IProps) => {
    const [menu, setMenu] = useMenuStore();

    if (!menu.menuItemComponent) {
        return null;
    }

    const handleClick = () => {
        onClick?.();

        if (children) {
            setMenu({ children, menuStyle });

            return;
        }
        if (action === 'back') {
            menu.back();

            return;
        }
        if (action === 'close') {
            setMenu({ isOpen: false, menuStyle: undefined });

            return;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: alignRight ? 'flex-end' : undefined, ...style }}>
            <menu.menuItemComponent
                disabled={disabled}
                onClick={handleClick}
            >
                {title}
            </menu.menuItemComponent>
        </div>
    );
};
