import './Screen.css';
import { MapData } from 'types';
import { generateRandomMapData } from "logic";
import { body } from "utils";
import { Map, Params as MapParams } from "components/Map/Map";
import { GameMenu } from "popups/menus/GameMenu";
import { OpenMenuButton } from "screens/OpenMenuButton/OpenMenuButton";
import { Message } from "./Message";
import { Div } from "components/Div";

async function generateMap({width, height}: Params): Promise<MapData> {
    const count = width * height;

    return generateRandomMapData(width, height, (n) =>
        Message(`Loading... ${Math.floor(100 * n / count)}%`)
    );
}

export interface Params {
    width: number;
    height: number;
    hexSize: number;
}

export async function GameScreen(params?: Params) {
    const mapParams: MapParams | undefined = params ? {mapData: await generateMap(params), hexSize: params.hexSize} : undefined;

    body(
        Div(
            [
                Map(mapParams),
                OpenMenuButton({openMenu: GameMenu}),
            ],
            {id: 'game-screen', className: 'screen'}
        ),
        true
    )
}
