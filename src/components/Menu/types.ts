import React, { CSSProperties, ReactNode } from 'react';

export type MenuComponent = (props: { style?: CSSProperties; children: ReactNode; testId?: string }) => React.JSX.Element;

export type MenuItemComponent = (props: {
    style?: CSSProperties;
    children: ReactNode;
    disabled?: boolean;
    onClick: () => void;
    testId?: string;
}) => React.JSX.Element;
