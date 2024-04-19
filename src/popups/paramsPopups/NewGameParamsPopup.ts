import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { MainMenu } from "../menus/MainMenu";
import { GameScreen, Params as GemScreenParams } from "screens/GameScreen";
import { Form } from "components/Form";
import { MapSizeBlock } from "./MapSizeBlock/MapSizeBlock";

interface Params {
    openParentMenu: () => void;
}

export function NewGameParamsPopup({openParentMenu}: Params) {
    Popup(({closePopup}) =>
        Form<GemScreenParams>(({getFormValues, checkSubmitValidity}) =>
            [
                Button('Back to main menu', {id: 'close-menu-button', onClick: [closePopup, openParentMenu]}),

                MapSizeBlock(),

                Button('Play', {onClick: () => {
                    if (!checkSubmitValidity()) {
                        return;
                    }

                    const values = getFormValues();

                    closePopup();
                    GameScreen(values);
                }}),
            ]
        ),
        {id: 'new-game-params-popup'},
    )
}
