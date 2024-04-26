import { Button } from "components/Button/Button";

interface Params {
    openMenu: (() => void) | (() => void)[];
}

export function OpenMenuButton({openMenu}: Params) {
    return Button('Open menu', {id: 'open-menu-button', onClick: openMenu});
}
