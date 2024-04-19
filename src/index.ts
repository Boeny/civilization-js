import './index.css';
import { MainMenu } from "popups/menus/MainMenu";
import { onLoad } from "utils";

enum KEY_CODE {
    esc = 'Escape',
}

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
