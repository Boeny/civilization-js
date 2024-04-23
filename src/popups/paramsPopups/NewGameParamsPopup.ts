import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { GameScreen, Params as GameScreenParams } from "screens/GameScreen";
import { Form } from "components/Form";
import { MapSizeBlock } from "./MapSizeBlock/MapSizeBlock";

const submit = (checkSubmitValidity: () => boolean, getFormValues: () => GameScreenParams) => () => {
    if (!checkSubmitValidity()) {
        return;
    }

    GameScreen(getFormValues());
}

interface Params {
    openParentMenu: () => void;
}

export function NewGameParamsPopup({openParentMenu}: Params) {
    Popup(({closePopup}) =>
        Form<GameScreenParams>(({getFormValues, checkSubmitValidity}) =>
            [
                Button('Back to main menu', {id: 'close-menu-button', onClick: [closePopup, openParentMenu]}),
                MapSizeBlock({autoFocus: true, onEnterKeyDown: submit(checkSubmitValidity, getFormValues)}),
                Button('Play', {onClick: submit(checkSubmitValidity, getFormValues)}),
            ]
        ),
        {id: 'new-game-params-popup'},
    )
}
