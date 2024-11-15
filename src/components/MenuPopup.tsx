import { CSSProperties } from 'react';

import { Block } from './Block';
import { Popup } from './Popup';
import { Children } from './types';

interface IProps {
    children: Children;
    style?: CSSProperties;
}
export function MenuPopup({ children, style }: IProps) {
    return (
        <Popup style={style}>
            <Block alignedVertically>{children}</Block>
        </Popup>
    );
}
