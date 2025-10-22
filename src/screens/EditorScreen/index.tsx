import '../styles.css';
import { useEffect, useState } from 'react';

import { ArrowButton } from 'components/ArrowButton';
import { MenuItem } from 'components/Menu/MenuItem';
import { getVector } from 'utils';

import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { TopPanel } from './components/TopPanel';
import { RIGHT_PANEL, TOP_PANEL_HEIGHT } from './const';
import { LAYER_CONFIG } from './layers/config';
import { Maps } from './layers/Maps';
import { MiniMaps } from './layers/MiniMaps';
import { useLayerStore } from './layerStore';

function useSyncExternalStore<T>(subscribe: (callback: () => void) => () => void, getSnapshot: () => T) {
    const [data, setData] = useState(getSnapshot());

    useEffect(() => {
        function update() {
            setData(getSnapshot());
        }

        return subscribe(update);
    }, []);

    return data;
}

function resizeSubscribe(callback: () => void) {
    window.addEventListener('resize', callback);

    return () => {
        window.removeEventListener('resize', callback);
    };
}

function getScreenSize() {
    return getVector(window.innerWidth, window.innerHeight);
}

export const EditorScreen = () => {
    const { layer } = useLayerStore().store;

    const [isLeftPanelShown, setLeftPanelShown] = useState(true);
    const [isRightPanelShown, setRightPanelShown] = useState(true);

    const toggleLeftPanel = () => setLeftPanelShown(!isLeftPanelShown);
    const toggleRightPanel = () => setRightPanelShown(!isRightPanelShown);

    const { leftPanelContent, topPanelContent } = LAYER_CONFIG[layer];

    const screenSize = useSyncExternalStore(resizeSubscribe, getScreenSize);

    return (
        <div
            className="screen"
            style={{ paddingTop: TOP_PANEL_HEIGHT }}
        >
            <Maps screenSize={screenSize} />

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
                    <MiniMaps
                        panelWidth={RIGHT_PANEL.innerWidth - 21}
                        screenSize={screenSize}
                    />
                </RightPanel>
            )}
        </div>
    );
};
