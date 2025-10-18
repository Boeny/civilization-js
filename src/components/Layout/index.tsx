import './styles.css';

import { Z_INDEX_CONFIG } from 'const';

export const Layout = ({ children }: any) => {
    return (
        <div
            id="layout"
            style={{ zIndex: Z_INDEX_CONFIG.layout.zIndex }}
        >
            {children}
        </div>
    );
};
