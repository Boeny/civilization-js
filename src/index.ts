import './index.css';
import { KEY_CODE } from 'const';
import { MainMenu } from "popups/menus/MainMenu";
import { onLoad } from "utils";

document.body.addEventListener('keydown', (e) => {
    if (e.key === KEY_CODE.esc) {
        const closeMenuButton = document.getElementById('close-menu-button');
        const openMenuButton = document.getElementById('open-menu-button');

        if (closeMenuButton) {
            closeMenuButton.click();
        } else if (openMenuButton) { // only if there is no close-menu-button on the screen, therefore, no opened menu
            openMenuButton.click();
        }
    }
});

onLoad(MainMenu);
