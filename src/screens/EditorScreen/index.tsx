import '../styles.css';
import { useState } from 'react';

import { ArrowButton } from 'components/ArrowButton';
import { MenuItem } from 'components/Menu/MenuItem';
import { useLayerObservableStore } from 'layerStore';

import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { TopPanel } from './components/TopPanel';
import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { LAYER_CONFIG } from './layersConfig/config';
import { Layers } from './layersConfig/Layers';
import { Map } from './layersConfig/Map';

export const EditorScreen = () => {
    const [{ layer }] = useLayerObservableStore();

    const [isLeftPanelShown, setLeftPanelShown] = useState(true);
    const [isRightPanelShown, setRightPanelShown] = useState(true);

    const toggleLeftPanel = () => setLeftPanelShown(!isLeftPanelShown);
    const toggleRightPanel = () => setRightPanelShown(!isRightPanelShown);

    const { leftPanelContent, topPanelContent } = LAYER_CONFIG[layer];

    return (
        <div
            className="screen"
            style={{ paddingTop: TOP_PANEL_HEIGHT }}
        >
            <Map />

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
                    <Layers width={RIGHT_PANEL.innerWidth} />
                </RightPanel>
            )}
        </div>
    );
};
