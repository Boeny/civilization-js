import './Screen.css';
import { body } from "utils";
import { Map, Params as MapParams } from "components/Map/Map";
import { GameMenu } from "popups/menus/GameMenu";
import { OpenMenuButton } from "screens/OpenMenuButton/OpenMenuButton";
import { Div } from "components/Div";

export interface Params {
    width: number;
    height: number;
    hexSize: number;
}

export async function GameScreen(params?: Params) {
    body(
        Div(
            OpenMenuButton({openMenu: GameMenu}),
            {id: 'game-screen', className: 'screen'}
        ),
        true
    );
}
