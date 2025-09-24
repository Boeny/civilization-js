import './styles.css';

import { ReactNode } from 'react';

import { Panel } from 'components/Panel';
import { Z_INDEX_CONFIG } from 'const';

interface IProps {
    children: ReactNode;
}

export const LeftPanel = ({ children }: IProps) => {
    return (
        <Panel
            id="left-panel"
            style={{ zIndex: Z_INDEX_CONFIG.leftPanel.zIndex }}
        >
            {children}
        </Panel>
    );
};
