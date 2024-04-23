import './Panel.css';
import { Div } from "components/Div";
import { Content } from "types";

export function Panel(content?: Content) {
    return Div(content, {className: 'panel'})
}
