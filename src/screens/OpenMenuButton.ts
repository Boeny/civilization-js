import { Button, Text } from "modules/renderer"

interface IParams {
    openMenu: () => void
}
export function OpenMenuButton({openMenu}: IParams) {
    return Button(Text('Open menu'), {onClick: openMenu})
}
