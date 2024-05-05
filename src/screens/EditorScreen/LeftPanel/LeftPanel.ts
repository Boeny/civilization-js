import './LeftPanel.css'
import { LAYER_TYPE, PANEL_CONFIG } from 'const'
import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from "screens/EditorScreen/const"
import { isLeftPanelOpened } from "state/leftPanelActions"
import { observable } from "hoc/observable"
import { showOnLayer } from 'hoc/showOnLayer'

import { Panel } from "components/Panel/Panel"
import { HexBrushes } from "./HexBrushes/HexBrushes"
import { getStyle } from 'utils'

function LeftPanel() {
    return Panel(
        HexBrushes(),
        {
            id: 'left-panel',
            style: {zIndex: PANEL_CONFIG.left.zIndex}
        }
    )
}

const LeftPanelToggleContainer = observable(LEFT_PANEL_TOGGLE_EVENT, () =>
    isLeftPanelOpened() ? LeftPanel() : null
)

export const LeftPanelContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, LeftPanelToggleContainer)
