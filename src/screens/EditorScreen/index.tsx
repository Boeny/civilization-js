import '../styles.css';
import { useState } from 'react';

import { IEditorParamsMenuState } from 'menus/EditorParamsMenu/store';

import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { HexBrushes } from './HexBrushes';
import { Layers } from './Layers';
import { getVisibility } from './layersConfig';
import { LeftPanel } from './LeftPanel';
import { Map } from './Map';
import { RightPanel } from './RightPanel';
import { DEFAULT_EDITOR_STATE, useEditorStore } from './store';
import { TopPanel } from './TopPanel';
import { LAYER_TYPE } from './types';
import { generateEmptyMapData } from './utils';

export const EditorScreen = ({ hexWidth, layer: defaultLayer, width, height }: IEditorParamsMenuState) => {
    const isDefaultLayerHex = defaultLayer === LAYER_TYPE.hex;

    const [{ layer }] = useEditorStore({
        ...DEFAULT_EDITOR_STATE,
        hexWidth,
        layer: defaultLayer,
        data: { [defaultLayer]: isDefaultLayerHex ? generateEmptyMapData(width, height) : null },
        visibility: getVisibility(true),
    });

    const isCurrentLayerHex = layer === LAYER_TYPE.hex;

    const [isLeftPanelShown, setLeftPanelShown] = useState(isDefaultLayerHex);
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
