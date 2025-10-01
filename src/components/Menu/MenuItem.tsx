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
    testId?: string;
}
export const MenuItem = ({ title, children, action, alignRight, style, menuStyle, disabled, onClick, testId }: IProps) => {
    const { store: menu, setStore: setMenu } = useMenuStore();

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
            menu.toggle(false);

            return;
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: alignRight ? 'flex-end' : undefined, ...style }}>
            <menu.menuItemComponent
                disabled={disabled}
                onClick={handleClick}
                testId={testId}
            >
                {title}
            </menu.menuItemComponent>
        </div>
    );
};
