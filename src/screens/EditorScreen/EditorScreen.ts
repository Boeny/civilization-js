import '../Screen.css';

import { generateEmptyMapData } from "logic";
import { body } from "utils";
import { getHexSize, setHexSizeAction } from 'state/state';
import { getMapData, setMapDataAction } from 'state/mapActions';

import { Map } from "components/Map/Map";
import { EditorMenu } from "popups/menus/EditorMenu";
import { OpenMenuButton } from "screens/OpenMenuButton/OpenMenuButton";
import { Div } from 'components/Div';
import { Panel } from 'components/Panel/Panel';
import { HexBrushes } from './HexBrushes/HexBrushes';
import { Layers } from './Layers/Layers';

export interface Params {
    width: number;
    height: number;
    hexSize: number;
}

export async function EditorScreen(params?: Params) {
    const mapData = params ? generateEmptyMapData(params.width, params.height) : getMapData();
    const hexSize = params?.hexSize || getHexSize();

    if (params) {
        setMapDataAction(mapData);
        setHexSizeAction(hexSize);
    }

    body(
        Div(
            [
                await Map({mapData, hexSize}),
                Panel(
                    [
                        OpenMenuButton({openMenu: EditorMenu}),
                        HexBrushes(),
                    ],
                    {padding: '42px 39px'}
                ),
                Panel(
                    Layers({width: 200}),
                    {
                        width: 200,
                        padding: 20,
                        left: `calc(100% - ${200}px - 2*${20}px)`
                    }
                ),
            ],
            {id: 'editor-screen', className: 'screen'}
        ),
        true
    );
}
