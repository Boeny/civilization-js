import './Panel.css';
import { Div, Params as DivParams } from "components/Div";
import { Content } from "types";

interface Params extends DivParams {
    right?: boolean;
}

export function Panel(content?: Content, params?: Params) {
    const width = params?.right ? 180 : undefined;
    const padding = params?.right ? 20 : '42px 39px';

    return Div(
        content,
        {
            className: 'panel',
            width,
            padding,
            left: params?.right ? `calc(100% - ${width}px - 2*${padding}px)` : 0,
        }
    )
}
