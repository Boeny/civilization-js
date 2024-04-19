import { Block } from "components/Block/Block";
import { Button } from "components/Button/Button";
import { Form } from "components/Form";
import { Popup } from "popups/Popup/Popup";

interface Params {
    openParentMenu: () => void;
}

export function OptionsPopup({openParentMenu}: Params) {
    Popup(({closePopup}) =>
        Form(({checkSubmitValidity, getFormValues}) =>
            [
                Button('Back to main menu', {id: 'close-menu-button', onClick: [closePopup, openParentMenu]}),

                Block(),

                Button('Save', {onClick: () => {
                    if (!checkSubmitValidity()) {
                        return;
                    }

                    // const values = getFormValues();

                    closePopup();
                    openParentMenu();
                }}),
            ]
        ),
        {id: 'editor-params-popup'}
    )
}
