import '../styles.css';
import { useEffect, useState } from 'react';

import { useLayerStore } from 'layerStore';
import { LAYER_TYPE } from 'types';

import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { HexBrushes } from './HexBrushes';
import { Layers } from './Layers';
import { LeftPanel } from './LeftPanel';
import { Map } from './Map';
import { useHexMapStore } from './Map/HexMap/store';
import { RightPanel } from './RightPanel';
import { TopPanel } from './TopPanel';
import { generateEmptyMapData } from './utils';

export const EditorScreen = () => {
    const [, setHexMapStore] = useHexMapStore();
    const [layerConfig] = useLayerStore();

    useEffect(() => {
        if (layerConfig.layer === LAYER_TYPE.hex) {
            setHexMapStore({
                data: generateEmptyMapData(layerConfig.width, layerConfig.height),
            });
        }
    }, []);

    const isCurrentLayerHex = layerConfig.layer === LAYER_TYPE.hex;

    const [isLeftPanelShown, setLeftPanelShown] = useState(true);
    const [isRightPanelShown, setRightPanelShown] = useState(true);

    const toggleLeftPanel = () => setLeftPanelShown(!isLeftPanelShown);
    const toggleRightPanel = () => setRightPanelShown(!isRightPanelShown);

    return (
        <div
            className="screen"
            style={{ paddingTop: TOP_PANEL_HEIGHT }}
        >
            <Map
                width={window.innerWidth}
                height={window.innerHeight - TOP_PANEL_HEIGHT}
            />
            <TopPanel
                showLeftPanelSwitcher={isCurrentLayerHex}
                toggleLeftPanel={toggleLeftPanel}
                toggleRightPanel={toggleRightPanel}
            />
            {isLeftPanelShown && isCurrentLayerHex && (
                <LeftPanel>
                    <HexBrushes />
                </LeftPanel>
            )}
            {isRightPanelShown && (
                <RightPanel>
                    <Layers width={RIGHT_PANEL.innerWidth} />
                </RightPanel>
            )}
        </div>
    );
};
