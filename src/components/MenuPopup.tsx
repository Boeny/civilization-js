import { CSSProperties, ReactNode } from 'react';

import { PopupComponent } from './Popup';

interface IProps {
    children: ReactNode;
    style?: CSSProperties;
    testId?: string;
}
export function MenuPopup({ children, style, testId }: IProps) {
    return (
        <PopupComponent
            testId={testId}
            style={style}
        >
            {children}
        </PopupComponent>
    );
}
