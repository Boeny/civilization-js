import '../Screen.css';

import { generateEmptyMapData } from "logic";
import { body } from "utils";
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

    body(
        Div(
            [
                Map({mapData, hexSize}),
                TopPanel(
                    OpenMenuButton({openMenu: EditorMenu}),
                ),
                Panel(
                    HexBrushes(),
                    {
                        height: '100%',
                        overflowY: 'scroll',
                        padding: '42px 39px',
                    }
                ),
                Panel(
                    Layers({width: 200}),
                    {
                        width: 200,
                        height: '100%',
                        overflowY: 'scroll',
                        padding: 20,
                        paddingTop: 42,
                        left: `calc(100% - ${200}px - 2*${20}px)`
                    }
                ),
            ],
            {id: 'editor-screen', className: 'screen'}
        ),
        true
    );
}

export const EditorScreen = cacheParams(EditorScreenComponent);
