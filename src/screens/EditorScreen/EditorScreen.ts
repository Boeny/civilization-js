import '../Screen.css';

import { LAYER_TYPE } from 'const';
import { LEFT_PANEL_KEY, RIGHT_PANEL_KEY } from 'screens/const';
import { generateEmptyMapData } from "logic";
import { body, trigger } from "utils";

import { setHexSizeAction } from 'state/hexSizeActions';
import { setMapDataAction } from 'state/mapActions';
import { setBrushAction } from 'state/brushActions';
import { setLayerAction } from 'state/layerActions';
import { setGridTurnedOn } from 'state/gridStatusActions';
import { isLeftPanelOpened, setLeftPanelOpened, toggleLeftPanelOpened } from 'state/leftPanelActions';
import { isRightPanelOpened, setRightPanelOpened, toggleRightPanelOpened } from 'state/rightPanelActions';

import { cacheParams } from 'hoc/cacheParams';

import { EditorMenu } from "popups/menus/EditorMenu";
import { Div } from 'components/Div';
import { MapContainer } from "../Map/Map";
import { OpenMenuButton } from "../OpenMenuButton";
import { TopPanel } from './TopPanel/TopPanel';
import { ToggleLeftPanelButton } from './ToggleLeftPanelButton';
import { ToggleRightPanelButton } from './ToggleRightPanelButton';
import { ToggleMapGridButtonContainer } from './ToggleMapGridButton';
import { LeftPanelContainer } from './LeftPanel/LeftPanel';
import { RIGHT_PANEL_WIDTH, RightPanelContainer } from './RightPanel/RightPanel';

const TOP_PANEL_HEIGHT = 32;

export interface Params {
    width: number;
    height: number;
    hexSize: number;
}

function EditorScreenComponent(params: Params) {
    const mapData = generateEmptyMapData(params.width, params.height);
    const hexSize = params.hexSize;

    setMapDataAction(mapData);
    setHexSizeAction(hexSize);
    setBrushAction(undefined);
    setLayerAction(LAYER_TYPE.hex);
    setGridTurnedOn(true);
    setLeftPanelOpened(true);
    setRightPanelOpened(true);

    body(
        Div(
            [
                MapContainer({
                    mapData,
                    hexSize,
                    width: window.innerWidth,
                    height: window.innerHeight - TOP_PANEL_HEIGHT
                }),

                TopPanel(
                    [
                        Div(
                            [
                                OpenMenuButton({openMenu: EditorMenu}),
                                ToggleLeftPanelButton({onClick: () => {
                                    toggleLeftPanelOpened();
                                    trigger(LEFT_PANEL_KEY);
                                }}),
                                ToggleMapGridButtonContainer(),
                            ],
                            {display: 'flex'},
                        ),
                        Div(
                            ToggleRightPanelButton({onClick: () => {
                                toggleRightPanelOpened();
                                trigger(RIGHT_PANEL_KEY);
                            }}),
                            {display: 'flex', width: RIGHT_PANEL_WIDTH},
                        ),
                    ],
                    {height: TOP_PANEL_HEIGHT}
                ),

                LeftPanelContainer(),
                RightPanelContainer(),
            ],
            {id: 'editor-screen', className: 'screen', paddingTop: TOP_PANEL_HEIGHT}
        ),
        true
    );
}

export const EditorScreen = cacheParams(EditorScreenComponent);
