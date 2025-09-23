import { CSSProperties, ReactNode } from 'react';

import { Block } from './Block';
import { Popup } from './Popup';

interface IProps {
    children: ReactNode;
    style?: CSSProperties;
}
export function MenuPopup({ children, style }: IProps) {
    return (
        <Popup style={style}>
            <Block alignedVertically>{children}</Block>
        </Popup>
    );
}
