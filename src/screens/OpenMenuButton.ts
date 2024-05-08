import { Button } from "components/base/Button"

interface Params {
    openMenu: () => void
}
export function OpenMenuButton({openMenu}: Params) {
    return Button('Open menu', {onClick: openMenu})
}
