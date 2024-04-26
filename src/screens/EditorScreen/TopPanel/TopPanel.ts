import './TopPanel.css';
import { Panel } from "components/Panel/Panel";
import { Attrs, Content } from "types";

export function TopPanel(content: Content, params?: Attrs) {
    return Panel(
        content,
        {id: 'top-panel', ...params}
    )
}
