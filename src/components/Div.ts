import { Content, insertContent } from "utils";

interface Params {
    id?: string;
    className?: string;
}

export function Div(content?: Content, params?: Params): HTMLDivElement {
    const el = document.createElement('div');

    if (params?.id) el.id = params.id;
    if (params?.className) el.className = params.className;

    insertContent(el, content);

    return el;
}
