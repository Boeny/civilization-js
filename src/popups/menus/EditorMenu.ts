import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { MainMenu } from './MainMenu';
import { EditorParamsPopup } from 'popups/paramsPopups/EditorParamsPopup';
import { EditorScreen } from 'screens/EditorScreen/EditorScreen';
import { OptionsPopup } from './OptionsPopup';

const SUB_MENU_PARAMS = {openParentMenu: EditorMenu};

export function EditorMenu() {
    Popup(({closePopup}) =>
        [
            Button('Back to editing', {id: 'close-menu-button', onClick: closePopup}),
            Button('Back to main menu', {onClick: MainMenu}),
            Button('Reload map', {onClick: EditorScreen}),
            Button('New map', {onClick: [closePopup, () => EditorParamsPopup(SUB_MENU_PARAMS)]}),
            Button('Options', {disabled: true, onClick: [closePopup, () => OptionsPopup(SUB_MENU_PARAMS)]}),
        ],
        {id: 'editor-menu'}
    )
}
