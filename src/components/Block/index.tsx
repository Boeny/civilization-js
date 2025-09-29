import './styles.css';
import { getClasses } from 'utils';

interface IBlockParams {
    className?: string;
    bordered?: boolean;
    align?: boolean;
    alignedVertically?: boolean;
    alignRight?: boolean;
    noPadding?: boolean;
    children?: any;
}
export const Block = ({ children, bordered, align, alignedVertically, alignRight, noPadding, className }: IBlockParams) => {
    const classes = getClasses([
        'block',
        bordered && 'bordered',
        align && 'flex',
        alignedVertically && 'flex-column',
        alignRight && 'flex-right',
        noPadding && 'no-padding',
        className,
    ]);

    return <div className={classes}>{children}</div>;
};
