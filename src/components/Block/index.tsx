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
    noMargin?: boolean;
    noPadding?: boolean;
    noGaps?: boolean;
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
    noMargin,
    noPadding,
    noGaps,
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
        (noGaps || noMargin) && 'no-margin',
        (noGaps || noPadding) && 'no-padding',
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
