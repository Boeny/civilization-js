import './styles.css';

import { Panel } from 'components/Panel';
import { Z_INDEX_CONFIG } from 'const';

import { RIGHT_PANEL, RIGHT_PANEL_WIDTH } from '../const';

const rightPanelStyle = {
    width: RIGHT_PANEL.innerWidth,
    paddingLeft: RIGHT_PANEL.padding,
    paddingRight: RIGHT_PANEL.padding,
    paddingBottom: RIGHT_PANEL.padding,
    left: `calc(100% - ${RIGHT_PANEL_WIDTH}px)`,
    zIndex: Z_INDEX_CONFIG.rightPanel.zIndex,
};

interface IProps {
    children: any;
}
export const RightPanel = ({ children }: IProps) => {
    return (
        <Panel
            id="right-panel"
            style={rightPanelStyle}
        >
            {children}
        </Panel>
    );
};
