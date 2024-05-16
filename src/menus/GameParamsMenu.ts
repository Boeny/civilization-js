import { Button, Fragment, Text } from "modules/renderer"

interface IParams {
    openParentMenu: () => void
}
export function GameParamsMenu({openParentMenu}: IParams) {
    return Fragment([
        Button(Text('Back to main menu'), {onClick: openParentMenu}),
        Button(Text('Play'), {onClick: () => {}}),
    ])
}
