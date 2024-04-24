import { Attrs, Content } from "types";
import { applyCommonAttrs, insertContent } from "utils";

export interface Params extends Attrs {
    background?: string;
}

export function Div(content?: Content, params?: Params) {
    const el = document.createElement('div');

    if (params?.background) el.style.background = params.background;

    applyCommonAttrs(el, params);
    insertContent(el, content);

    return el;
}
