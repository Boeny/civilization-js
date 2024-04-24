import '../Screen.css';

import { generateEmptyMapData } from "logic";
import { body } from "utils";
import { getHexSize, getMapData, setHexSizeAction, setMapDataAction } from 'state/state';

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
                Panel([
                    OpenMenuButton({openMenu: EditorMenu}),
                    HexBrushes(),
                ]),
                Panel(Layers(), {right: true}),
            ],
            {id: 'editor-screen', className: 'screen'}
        ),
        true
    );
}
