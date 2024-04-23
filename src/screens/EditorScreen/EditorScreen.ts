import '../Screen.css';
import { generateEmptyMapData } from "logic";
import { body } from "utils";
import { Map, Params as MapParams } from "components/Map/Map";
import { EditorMenu } from "popups/menus/EditorMenu";
import { OpenMenuButton } from "screens/OpenMenuButton/OpenMenuButton";
import { Div } from 'components/Div';
import { Panel } from 'components/Panel/Panel';
import { HexBrushes } from './HexBrushes';

export interface Params {
    width: number;
    height: number;
    hexSize: number;
}

export async function EditorScreen(params?: Params) {
    const mapParams: MapParams | undefined = params ? {mapData: generateEmptyMapData(params.width, params.height), hexSize: params.hexSize} : undefined;

    body(
        Div(
            [
                await Map(mapParams),
                Panel([
                    OpenMenuButton({openMenu: EditorMenu}),
                    HexBrushes(),
                ]),
            ],
            {id: 'editor-screen', className: 'screen'}
        ),
        true
    );
}
