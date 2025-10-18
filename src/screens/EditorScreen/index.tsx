import '../styles.css';
import { useState } from 'react';

import { ArrowButton } from 'components/ArrowButton';
import { MenuItem } from 'components/Menu/MenuItem';
import { getVector } from 'utils';

import { Layers } from './components/Layers';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { TopPanel } from './components/TopPanel';
import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { LAYER_CONFIG } from './layersConfig/config';
import { Map } from './layersConfig/Map';
import { useLayerStore } from './layerStore';

export const EditorScreen = () => {
    const { layer } = useLayerStore().store;

    const [isLeftPanelShown, setLeftPanelShown] = useState(true);
    const [isRightPanelShown, setRightPanelShown] = useState(true);

    const toggleLeftPanel = () => setLeftPanelShown(!isLeftPanelShown);
    const toggleRightPanel = () => setRightPanelShown(!isRightPanelShown);

    const { leftPanelContent, topPanelContent } = LAYER_CONFIG[layer];

    const screenSize = getVector(window.innerWidth, window.innerHeight);

    return (
        <div
            className="screen"
            style={{ paddingTop: TOP_PANEL_HEIGHT }}
        >
            <Map screenSize={screenSize} />

            <TopPanel>
                <div style={{ display: 'flex' }}>
                    <MenuItem
                        title="Open menu"
                        action="back"
                    />
                    {leftPanelContent && <ArrowButton onClick={toggleLeftPanel} />}
                    {topPanelContent}
                </div>
                <div style={{ display: 'flex', width: RIGHT_PANEL.width }}>
                    <ArrowButton onClick={toggleRightPanel} />
                </div>
            </TopPanel>

            {isLeftPanelShown && leftPanelContent && <LeftPanel>{leftPanelContent}</LeftPanel>}

            {isRightPanelShown && (
                <RightPanel>
                    <Layers
                        panelWidth={RIGHT_PANEL.innerWidth}
                        screenSize={screenSize}
                    />
                </RightPanel>
            )}
        </div>
    );
};
