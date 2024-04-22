import { Content } from "types";
import { insertContent } from "utils";

interface Params {
    id?: string;
    className?: string;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
}

export function Div(content?: Content, params?: Params) {
    const el = document.createElement('div');

    if (params?.id) el.id = params.id;
    if (params?.className) el.className = params.className;
    if (params?.marginLeft) el.style.marginLeft = `${params.marginLeft}px`;
    if (params?.marginTop) el.style.marginTop = `${params.marginTop}px`;
    if (params?.marginBottom) el.style.marginBottom = `${params.marginBottom}px`;

    insertContent(el, content);

    return el;
}
