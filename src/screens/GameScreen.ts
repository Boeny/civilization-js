import { Block } from "components/Block/Block";
import { Map } from "components/Map/Map";
import { GameMenu } from "popups/menus/GameMenu";
import { OpenMenuButton } from "screens/OpenMenuButton/OpenMenuButton";
import { body, quitGameScreen } from "utils";

export interface Params {
    width: number;
    height: number;
    hexSize: number;
}

let cachedParams: Params;

export function GameScreen(params: Params = cachedParams) {
    cachedParams = params;

    quitGameScreen();

    body(
        Block(
            [
                Map(params),
                OpenMenuButton({openMenu: GameMenu}),
            ],
            {id: 'game-screen'}
        )
    )
}
