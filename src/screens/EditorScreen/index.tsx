import '../styles.css';
import { useCallback, useEffect, useState } from 'react';

import { IEditorParamsMenuState } from 'menus/EditorParamsMenu/store';

import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { LeftPanel } from './LeftPanel';
import { HexBrushes } from './LeftPanel/HexBrushes';
import { Map } from './Map';
import { RightPanel } from './RightPanel';
import { Layers } from './RightPanel/Layers';
import { useEditorStore } from './store';
import { TopPanel } from './TopPanel';
import { LAYER_TYPE } from './types';
import { generateEmptyMapData } from './utils';

export const EditorScreen = ({ hexWidth, layer: defaultLayer, width, height }: IEditorParamsMenuState) => {
    const [store, setStore] = useEditorStore();

    useEffect(() => {
        if (defaultLayer === LAYER_TYPE.hex) {
            store.data[LAYER_TYPE.hex] = generateEmptyMapData(width, height);
        }
        store.visibility[defaultLayer] = true;

        setStore({ hexWidth, layer: defaultLayer });
    }, [height, hexWidth, defaultLayer, setStore, store, width]);

    const isHex = store.layer === LAYER_TYPE.hex;

    const [isLeftPanelShown, setLeftPanelShown] = useState(defaultLayer === LAYER_TYPE.hex);
    const [isRightPanelShown, setRightPanelShown] = useState(defaultLayer === LAYER_TYPE.hex);

    const toggleLeftPanel = useCallback(() => setLeftPanelShown(!isLeftPanelShown), [isLeftPanelShown]);
    const toggleRightPanel = useCallback(() => setRightPanelShown(!isRightPanelShown), [isRightPanelShown]);

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
                isHex={isHex}
                toggleLeftPanel={toggleLeftPanel}
                toggleRightPanel={toggleRightPanel}
            />
            {isHex && isLeftPanelShown && (
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
