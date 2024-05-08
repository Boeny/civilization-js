import './LeftPanel.css'
import { Z_INDEX_CONFIG } from 'const'
import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from "screens/EditorScreen/const"
import { observable } from "hoc/observable"
import { showOnLayer } from 'hoc/showOnLayer'
import { Panel } from "components/Panel"
import { HexBrushes } from "./HexBrushes"
import { editorScreenStore } from '../store'
import { LAYER_TYPE } from '../types'

function LeftPanel() {
    return Panel(
        HexBrushes(),
        {
            id: 'left-panel',
            style: {zIndex: Z_INDEX_CONFIG.left.zIndex}
        }
    )
}

const LeftPanelToggleContainer = observable(LEFT_PANEL_TOGGLE_EVENT, () =>
    editorScreenStore.isLeftPanelOpened.value ? LeftPanel() : null
)

export const LeftPanelContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, LeftPanelToggleContainer)
