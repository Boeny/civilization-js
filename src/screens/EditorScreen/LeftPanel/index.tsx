import './styles.css';
import { memo } from 'react';

import { Panel } from 'components/Panel';
import { Z_INDEX_CONFIG } from 'const';

interface IProps {
    children: any;
}
export const LeftPanel = memo(({ children }: IProps) => {
    return (
        <Panel
            id="left-panel"
            style={{ zIndex: Z_INDEX_CONFIG.left.zIndex }}
        >
            {children}
        </Panel>
    );
});
