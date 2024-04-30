import './LeftPanel.css';

import { LAYER_TYPE } from 'const';
import { LAYER_CHANGE_EVENT, LEFT_PANEL_TOGGLE_EVENT } from "screens/EditorScreen/const";
import { isLeftPanelOpened } from "state/leftPanelActions";

import { observableAttrs } from "hoc/observable";
import { showOnLayer } from 'hoc/showOnLayer';

import { Panel } from "components/Panel/Panel";
import { HexBrushes } from "./HexBrushes/HexBrushes";

function LeftPanel() {
    return Panel(HexBrushes(), {id: 'left-panel'})
}

const LeftPanelToggleContainer = observableAttrs(
    LEFT_PANEL_TOGGLE_EVENT,
    LeftPanel,
    [{
        name: 'className',
        value: () => isLeftPanelOpened() ? 'panel opened' : 'panel'
    }]
)

export const LeftPanelContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, LeftPanelToggleContainer)
