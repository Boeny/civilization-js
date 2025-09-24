import './styles.css';

import { ReactNode } from 'react';

import { Panel } from 'components/Panel';
import { Z_INDEX_CONFIG } from 'const';

import { TOP_PANEL_HEIGHT } from '../../const';

interface IProps {
    children: ReactNode;
}
export const TopPanel = ({ children }: IProps) => {
    return (
        <Panel
            id="top-panel"
            style={{ zIndex: Z_INDEX_CONFIG.topPanel.zIndex, height: TOP_PANEL_HEIGHT }}
        >
            {children}
        </Panel>
    );
};
