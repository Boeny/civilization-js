import { Block } from "components/Block"
import { Button } from "components/base/Button"
import { Fragment } from "components/base/Fragment"

interface Params {
    openParentMenu: () => void
}
export function OptionsMenu({openParentMenu}: Params) {
    return Fragment([
        Button('Back to main menu', {onClick: openParentMenu}),
        Block(),
        Button('Save', {onClick: openParentMenu}),
    ])
}
