/* eslint-disable react/destructuring-assignment */
import '../styles.css';
import { useState } from 'react';

import { IEditorParamsMenuState, LAYER_TYPE } from 'types';

import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { HexBrushes } from './HexBrushes';
import { Layers } from './Layers';
import { LeftPanel } from './LeftPanel';
import { Map } from './Map';
import { RightPanel } from './RightPanel';
import { DEFAULT_EDITOR_STATE, useEditorStore } from './store';
import { TopPanel } from './TopPanel';
import { generateEmptyMapData } from './utils';

// props is used to split hex and image params
export const EditorScreen = (props: IEditorParamsMenuState) => {
    const isDefaultLayerHex = props.layer === LAYER_TYPE.hex;

    const [{ layer }] = useEditorStore({
        ...DEFAULT_EDITOR_STATE,
        layer: props.layer,
        data: { [props.layer]: isDefaultLayerHex ? generateEmptyMapData(props.width, props.height) : null },
    });

    const isCurrentLayerHex = layer === LAYER_TYPE.hex;

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
