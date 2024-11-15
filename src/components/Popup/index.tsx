import './styles.css';
import { CSSProperties } from 'react';

import { Layout } from 'components/Layout';
import { Children } from 'components/types';
import { getClasses } from 'utils';

interface Props {
    className?: string;
    style?: CSSProperties;
    children: Children;
}
export const Popup = ({ children, className, style }: Props) => {
    return (
        <Layout>
            <div
                className={getClasses(['popup', className])}
                style={style}
            >
                {children}
            </div>
        </Layout>
    );
};
