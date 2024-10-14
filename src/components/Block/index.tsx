import './styles.css';
import { getClasses } from 'utils';

interface IBlockParams {
    className?: string;
    bordered?: boolean;
    alignedVertically?: boolean;
    children?: any;
}
export const Block = ({ children, bordered, alignedVertically, className }: IBlockParams) => {
    const classes = getClasses(['block', bordered && 'bordered', alignedVertically && 'flex-column', className]);

    return <div className={classes}>{children}</div>;
};
