import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { EditorScreen, Params as EditorScreenParams } from "screens/EditorScreen/EditorScreen";
import { Form } from "components/Form";
import { MapSizeBlock } from "./MapSizeBlock/MapSizeBlock";

const submit = (checkSubmitValidity: () => boolean, getFormValues: () => EditorScreenParams) => () => {
    if (!checkSubmitValidity()) {
        return;
    }

    EditorScreen(getFormValues());
}

interface Params {
    openParentMenu: () => void;
}

export function EditorParamsPopup({openParentMenu}: Params) {
    Popup(({closePopup}) =>
        Form<EditorScreenParams>(({getFormValues, checkSubmitValidity}) =>
            [
                Button('Back to main menu', {id: 'close-menu-button', onClick: [closePopup, openParentMenu]}),
                MapSizeBlock({autoFocus: true, onEnterKeyDown: submit(checkSubmitValidity, getFormValues)}),
                Button('Create Map', {onClick: submit(checkSubmitValidity, getFormValues)}),
            ]
        ),
        {id: 'editor-params-popup'}
    )
}
