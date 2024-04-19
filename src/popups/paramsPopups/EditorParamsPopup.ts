import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { MainMenu } from "../menus/MainMenu";
import { EditorScreen, Params as EditorScreenParams } from "screens/EditorScreen";
import { Form } from "components/Form";
import { MapSizeBlock } from "./MapSizeBlock/MapSizeBlock";

interface Params {
    openParentMenu: () => void;
}

export function EditorParamsPopup({openParentMenu}: Params) {
    Popup(({closePopup}) =>
        Form<EditorScreenParams>(({getFormValues, checkSubmitValidity}) =>
            [
                Button('Back to main menu', {id: 'close-menu-button', onClick: [closePopup, openParentMenu]}),

                MapSizeBlock(),

                Button('Create Map', {onClick: () => {
                    if (!checkSubmitValidity()) {
                        return;
                    }

                    const values = getFormValues();

                    closePopup();
                    EditorScreen(values);
                }}),
            ]
        ),
        {id: 'editor-params-popup'}
    )
}
