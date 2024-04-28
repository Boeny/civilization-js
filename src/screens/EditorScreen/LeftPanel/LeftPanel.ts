import './LeftPanel.css';
import { LEFT_PANEL_KEY } from "screens/EditorScreen/const";
import { isLeftPanelOpened } from "state/leftPanelActions";
import { observableAttrs } from "hoc/observable";
import { Panel } from "components/Panel/Panel";
import { HexBrushes } from "./HexBrushes/HexBrushes";

function LeftPanel() {
    return Panel(HexBrushes(), {id: 'left-panel'})
}

export const LeftPanelContainer = observableAttrs(
    LEFT_PANEL_KEY,
    LeftPanel,
    [{
        name: 'className',
        value: () => isLeftPanelOpened() ? 'panel opened' : 'panel'
    }]
)
