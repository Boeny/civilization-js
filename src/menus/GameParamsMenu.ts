import { Button } from "components/base/Button"
import { Fragment } from "components/base/Fragment"

interface Params {
    openParentMenu: () => void
}
export function GameParamsMenu({openParentMenu}: Params) {
    return Fragment([
        Button('Back to main menu', {onClick: openParentMenu}),
        Button('Play', {onClick: () => {}}),
    ])
}
