import './Panel.css';
import { Div, Params as DivParams } from "components/Div";
import { Content } from "types";

interface Params extends DivParams {
}

export function Panel(content?: Content, params?: Params) {
    return Div(
        content,
        {
            className: 'panel',
            ...params,
        }
    )
}
