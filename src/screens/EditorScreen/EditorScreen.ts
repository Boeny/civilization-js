import '../Screen.css';

import { generateEmptyMapData } from "logic";
import { body, trigger } from "utils";
import { setHexSizeAction } from 'state/state';
import { setMapDataAction } from 'state/mapActions';

import { Map } from "../Map/Map";
import { EditorMenu } from "popups/menus/EditorMenu";
import { OpenMenuButton } from "screens/OpenMenuButton";
import { Div } from 'components/Div';
import { Panel } from 'components/Panel/Panel';
import { HexBrushes } from './HexBrushes/HexBrushes';
import { Layers } from './Layers/Layers';
import { cacheParams } from 'hoc/cacheParams';
import { setBrushAction } from 'state/brushActions';
import { TopPanel } from './TopPanel/TopPanel';
import { ToggleLeftPanelButton } from './ToggleLeftPanelButton';
import { observableAttrs } from 'hoc/observable';
import { setLayerAction } from 'state/layerActions';
import { LAYER_TYPE } from 'const';

const LEFT_PANEL_KEY = 'toggle-left-panel';
const TOP_PANEL_HEIGHT = 32;
const RIGHT_PANEL = {width: 200, padding: 20};

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

    let isLeftPanelOpened = true;

    body(
        Div(
            [
                Map({mapData, hexSize}),
                TopPanel(
                    [
                        OpenMenuButton({openMenu: EditorMenu}),
                        ToggleLeftPanelButton({onClick: () => {
                            isLeftPanelOpened = !isLeftPanelOpened;
                            trigger(LEFT_PANEL_KEY);
                        }}),
                    ],
                    {height: TOP_PANEL_HEIGHT}
                ),
                observableAttrs(
                    LEFT_PANEL_KEY,
                    Panel(
                        HexBrushes(),
                        {
                            height: '100%',
                            overflowY: 'scroll',
                            padding: '42px 39px',
                        }
                    ),
                    [
                        {name: 'className', value: () => isLeftPanelOpened ? 'panel opened' : 'panel'}
                    ]
                ),
                Panel(
                    Layers({width: RIGHT_PANEL.width}),
                    {
                        width: RIGHT_PANEL.width,
                        height: '100%',
                        overflowY: 'scroll',
                        padding: RIGHT_PANEL.padding,
                        paddingTop: 42,
                        left: `calc(100% - ${RIGHT_PANEL.width}px - 2*${RIGHT_PANEL.padding}px)`
                    }
                ),
            ],
            {id: 'editor-screen', className: 'screen', paddingTop: TOP_PANEL_HEIGHT}
        ),
        true
    );
}

export const EditorScreen = cacheParams(EditorScreenComponent);
