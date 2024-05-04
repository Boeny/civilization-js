import './TopPanel.css'
import { Content } from "types"
import { Panel, Params as PanelParams } from "components/Panel/Panel"

export interface Params extends PanelParams {
}

export function TopPanel(content: Content, params?: Params) {
    return Panel(
        content,
        {id: 'top-panel', ...params}
    )
}
