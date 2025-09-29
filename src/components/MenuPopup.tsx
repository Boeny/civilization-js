import { CSSProperties, ReactNode } from 'react';

import { PopupComponent } from './Popup';

interface IProps {
    children: ReactNode;
    style?: CSSProperties;
}
export function MenuPopup({ children, style }: IProps) {
    return <PopupComponent style={style}>{children}</PopupComponent>;
}
