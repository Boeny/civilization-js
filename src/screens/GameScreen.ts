import './Screen.css'
import { Div } from "components/base/Div"
import { OpenMenuButton } from "screens/OpenMenuButton"

export function GameScreen({openMenu}: {openMenu: () => void}) {
    return Div(
        OpenMenuButton({openMenu}),
        {id: 'game-screen', className: 'screen'}
    )
}
