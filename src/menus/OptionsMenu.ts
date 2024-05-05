import { Block } from "components/Block/Block"
import { Button } from "components/base/Button/Button"
import { Fragment } from "components/base/Fragment"

interface Params {
    onBackClick: () => void
}

export function OptionsMenu({onBackClick}: Params) {
    return Fragment([
        Button('Back to main menu', {onClick: onBackClick}),
        Block(),
        Button('Save', {onClick: onBackClick}),
    ])
}
