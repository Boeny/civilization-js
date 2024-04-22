import { Button } from "components/Button/Button";
import { Popup } from "popups/Popup/Popup";
import { NewGameParamsPopup } from "../paramsPopups/NewGameParamsPopup";
import { MainMenu } from './MainMenu';
import { GameScreen } from 'screens/GameScreen';
import { OptionsPopup } from './OptionsPopup';

const SUB_MENU_PARAMS = {openParentMenu: GameMenu};

export function GameMenu() {
    Popup(({closePopup}) =>
        [
            Button('Back to the game', {id: 'close-menu-button', onClick: closePopup}),
            Button('Back to main menu', {onClick: MainMenu}),
            Button('Restart game', {onClick: GameScreen}),
            Button('New game', {onClick: [closePopup, () => NewGameParamsPopup(SUB_MENU_PARAMS)]}),
            Button('Options', {onClick: [closePopup, () => OptionsPopup(SUB_MENU_PARAMS)]}),
        ],
        {id: 'game-menu'}
    )
}
