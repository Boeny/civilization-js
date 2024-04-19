import { Block } from "components/Block/Block";
import { Map } from "components/Map/Map";
import { EditorMenu } from "popups/menus/EditorMenu";
import { OpenMenuButton } from "screens/OpenMenuButton/OpenMenuButton";
import { body } from "utils";

export interface Params {
    width: number;
    height: number;
}

let cachedParams: Params;

export function EditorScreen(params: Params = cachedParams) {
    cachedParams = params;
    console.log(params);
    body(
        Block(
            [
                Map({...params}),
                OpenMenuButton({openMenu: EditorMenu}),
            ],
            {id: 'editor-screen'}
        )
    );
}
