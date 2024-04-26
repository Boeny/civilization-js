import './TopPanel.css';
import { Panel, Params as PanelParams } from "components/Panel/Panel";
import { Content } from "types";

export function TopPanel(content: Content, params?: PanelParams) {
    return Panel(
        content,
        {id: 'top-panel', ...params}
    )
}
