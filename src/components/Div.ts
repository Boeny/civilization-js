import { Attrs, Content } from "types";
import { applyCommonAttrs, insertContent } from "utils";

export interface Params extends Attrs {
    background?: string;
    overflow?: string;
    overflowX?: string;
    overflowY?: string;
}

export function Div(content?: Content, params?: Params) {
    const el = document.createElement('div');

    if (params?.background) el.style.background = params.background;
    if (params?.overflow) el.style.overflow = params.overflow;
    if (params?.overflowX) el.style.overflowX = params.overflowX;
    if (params?.overflowY) el.style.overflowY = params.overflowY;

    applyCommonAttrs(el, params);
    insertContent(el, content);

    return el;
}
