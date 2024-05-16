import { Button, Fragment, Text } from "modules/renderer"
import { Block } from "components/Block"

interface IParams {
    openParentMenu: () => void
}
export function OptionsMenu({openParentMenu}: IParams) {
    return Fragment([
        Button(Text('Back to main menu'), {onClick: openParentMenu}),
        Block(),
        Button(Text('Save'), {onClick: openParentMenu}),
    ])
}
