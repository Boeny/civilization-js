import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { MainMenu } from './MainMenu';
import { EditorParamsPopup } from 'popups/paramsPopups/EditorParamsPopup';
import { EditorScreen } from 'screens/EditorScreen';
import { quitEditorScreen } from 'utils';
import { OptionsPopup } from './OptionsPopup';

const SUB_MENU_PARAMS = {openParentMenu: EditorMenu};

export function EditorMenu() {
    Popup(({closePopup}) =>
        [
            Button('Back to editing', {id: 'close-menu-button', onClick: closePopup}),
            Button('Back to main menu', {onClick: [quitEditorScreen, closePopup, MainMenu]}),
            Button('Reload map', {onClick: [closePopup, EditorScreen]}),
            Button('New map', {onClick: [closePopup, () => EditorParamsPopup(SUB_MENU_PARAMS)]}),
            Button('Options', {onClick: [closePopup, () => OptionsPopup(SUB_MENU_PARAMS)]}),
        ],
        {id: 'editor-menu'}
    )
}
