import '../styles.css';
import { useState } from 'react';

import { ArrowButton } from 'components/ArrowButton';
import { MenuItem } from 'components/Menu/MenuItem';
import { useLayerStore } from 'layerStore';

import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { TopPanel } from './components/TopPanel';
import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { LAYER_CONFIG } from './layersConfig/config';
import { Layers } from './layersConfig/Layers';
import { Map } from './layersConfig/Map';

export const EditorScreen = () => {
    const [layerConfig] = useLayerStore();

    const [isLeftPanelShown, setLeftPanelShown] = useState(true);
    const [isRightPanelShown, setRightPanelShown] = useState(true);

    const toggleLeftPanel = () => setLeftPanelShown(!isLeftPanelShown);
    const toggleRightPanel = () => setRightPanelShown(!isRightPanelShown);

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
                    <ArrowButton onClick={toggleLeftPanel} />

                    {LAYER_CONFIG[layerConfig.layer].topPanelContent}
                </div>
                <div style={{ display: 'flex', width: RIGHT_PANEL.width }}>
                    <ArrowButton onClick={toggleRightPanel} />
                </div>
            </TopPanel>

            {isLeftPanelShown && <LeftPanel>{LAYER_CONFIG[layerConfig.layer].leftPanelContent}</LeftPanel>}

            {isRightPanelShown && (
                <RightPanel>
                    <Layers width={RIGHT_PANEL.innerWidth} />
                </RightPanel>
            )}
        </div>
    );
};
