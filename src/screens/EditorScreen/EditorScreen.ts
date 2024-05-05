import '../Screen.css'
import { Div } from 'components/base/Div'
import { TopPanel } from './TopPanel/TopPanel'
import { LeftPanelContainer } from './LeftPanel/LeftPanel'
import { RIGHT_PANEL_WIDTH, RightPanelContainer } from './RightPanel/RightPanel'
import { Map } from './Map/Map'

const TOP_PANEL_HEIGHT = 32

export function EditorScreen({openMenu}: {openMenu: () => void}) {
    return Div(
        [
            Map({
                width: window.innerWidth,
                height: window.innerHeight - TOP_PANEL_HEIGHT,
            }),

            TopPanel({openMenu, rightPanelWidth: RIGHT_PANEL_WIDTH, style: {height: TOP_PANEL_HEIGHT}}),
            LeftPanelContainer(),
            RightPanelContainer(),
        ],
        {className: 'screen', style: {paddingTop: TOP_PANEL_HEIGHT}}
    )
}
