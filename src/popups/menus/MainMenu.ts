import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { NewGameParamsPopup } from "../paramsPopups/NewGameParamsPopup";
import { EditorParamsPopup } from "../paramsPopups/EditorParamsPopup";
import { OptionsPopup } from './OptionsPopup';

const SUB_MENU_PARAMS = {openParentMenu: MainMenu};

export function MainMenu() {
    Popup(({closePopup}) =>
        [
            Button('New Game', {disabled: true, onClick: [closePopup, () => NewGameParamsPopup(SUB_MENU_PARAMS)]}),
            Button('Editor', {onClick: [closePopup, () => EditorParamsPopup(SUB_MENU_PARAMS)]}),
            Button('Options', {disabled: true, onClick: [closePopup, () => OptionsPopup(SUB_MENU_PARAMS)]}),
        ],
        {id: 'main-menu', reset: true}
    )
}
