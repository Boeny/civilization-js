import { CSSProperties } from 'react';

import { Children } from 'components/types';

export type MenuComponent = (props: { style?: CSSProperties; children: Children }) => JSX.Element;

export type MenuItemComponent = (props: {
    style?: CSSProperties;
    children: Children | string;
    disabled?: boolean;
    onClick: () => void;
}) => JSX.Element;
