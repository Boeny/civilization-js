import { Button } from "components/base/Button/Button"

interface Params {
    openMenu: () => void
}

export function OpenMenuButton({openMenu}: Params) {
    return Button('Open menu', {id: 'open-menu-button', onClick: openMenu})
}
