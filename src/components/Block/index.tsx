import './styles.css';
import { CSSProperties, ReactNode } from 'react';

import { getClasses } from 'utils';

interface IBlockParams {
    className?: string;
    bordered?: boolean;
    align?: boolean;
    alignedVertically?: boolean;
    alignRight?: boolean;
    alignCenter?: boolean;
    noPadding?: boolean;
    children?: ReactNode;
    style?: CSSProperties;
}
export const Block = ({
    children,
    bordered,
    align,
    alignedVertically,
    alignRight,
    alignCenter,
    noPadding,
    className,
    style,
}: IBlockParams) => {
    const classes = getClasses([
        'block',
        bordered && 'bordered',
        align && 'flex',
        alignedVertically && 'flex-column',
        alignRight && 'flex-right',
        alignCenter && 'flex-center',
        noPadding && 'no-padding',
        className,
    ]);

    return (
        <div
            className={classes}
            style={style}
        >
            {children}
        </div>
    );
};
