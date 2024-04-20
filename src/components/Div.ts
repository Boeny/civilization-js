import { Content, insertContent } from "utils";

interface Params {
    id?: string;
    className?: string;
    marginLeft?: number;
}

export function Div(content?: Content, params?: Params): HTMLDivElement {
    const el = document.createElement('div');

    if (params?.id) el.id = params.id;
    if (params?.className) el.className = params.className;
    if (params?.marginLeft) el.style.marginLeft = `${params.marginLeft}px`;

    insertContent(el, content);

    return el;
}
