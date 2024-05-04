import './LeftPanel.css'
import { LAYER_TYPE } from 'const'
import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from "screens/EditorScreen/const"
import { isLeftPanelOpened } from "state/leftPanelActions"
import { observable } from "hoc/observable"
import { showOnLayer } from 'hoc/showOnLayer'

import { Panel } from "components/Panel/Panel"
import { HexBrushes } from "./HexBrushes/HexBrushes"

function LeftPanel() {
    return Panel(HexBrushes(), {id: 'left-panel'})
}

const LeftPanelToggleContainer = observable(LEFT_PANEL_TOGGLE_EVENT, () =>
    isLeftPanelOpened() ? LeftPanel() : null
)

export const LeftPanelContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, LeftPanelToggleContainer)
