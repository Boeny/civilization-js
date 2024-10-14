import { Layout } from 'components/Layout';
import { getClasses } from 'utils';
import './styles.css';

interface Props {
    className?: string;
    children: any;
}
export const Popup = ({ children, className }: Props) => {
    return (
        <Layout>
            <div className={getClasses(['popup', className])}>{children}</div>
        </Layout>
    );
};
