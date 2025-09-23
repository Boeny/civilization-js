import './styles.css';
import { CSSProperties, ReactNode } from 'react';

import { Layout } from 'components/Layout';
import { getClasses } from 'utils';

interface Props {
    className?: string;
    style?: CSSProperties;
    children: ReactNode;
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
