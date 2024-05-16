import './Screen.css'
import { Div } from "modules/renderer"
import { OpenMenuButton } from "screens/OpenMenuButton"

interface IParams {
    openMenu: () => void
}
export function GameScreen({openMenu}: IParams) {
    return Div(
        OpenMenuButton({openMenu}),
        {id: 'game-screen', className: 'screen'}
    )
}
