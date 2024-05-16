import '../Screen.css'
import { Div } from 'modules/renderer'
import { TopPanel } from './TopPanel'
import { LeftPanelContainer } from './LeftPanel'
import { RIGHT_PANEL_WIDTH, RightPanelToggleObserver } from './RightPanel'
import { Map } from './Map'

const TOP_PANEL_HEIGHT = 32

interface IParams {
    openMenu: () => void
}
export function EditorScreen({openMenu}: IParams) {
    return Div(
        [
            Map({
                width: window.innerWidth,
                height: window.innerHeight - TOP_PANEL_HEIGHT,
            }),

            TopPanel({openMenu, rightPanelWidth: RIGHT_PANEL_WIDTH, style: {height: TOP_PANEL_HEIGHT}}),
            LeftPanelContainer(),
            RightPanelToggleObserver(),
        ],
        {className: 'screen', style: {paddingTop: TOP_PANEL_HEIGHT}}
    )
}
