import '../Screen.css'
import { Div } from 'components/base/Div'
import { TopPanel } from './TopPanel'
import { LeftPanelContainer } from './LeftPanel'
import { RIGHT_PANEL_WIDTH, RightPanelToggleObservable } from './RightPanel'
import { Map } from './Map'

const TOP_PANEL_HEIGHT = 32

interface Params {
    openMenu: () => void
}
export function EditorScreen({openMenu}: Params) {
    return Div(
        [
            Map({
                width: window.innerWidth,
                height: window.innerHeight - TOP_PANEL_HEIGHT,
            }),

            TopPanel({openMenu, rightPanelWidth: RIGHT_PANEL_WIDTH, style: {height: TOP_PANEL_HEIGHT}}),
            LeftPanelContainer(),
            RightPanelToggleObservable(),
        ],
        {className: 'screen', style: {paddingTop: TOP_PANEL_HEIGHT}}
    )
}
