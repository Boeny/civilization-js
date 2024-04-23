import { Content } from "types";
import { insertContent } from "utils";

interface Params {
    id?: string;
    className?: string;
    marginLeft?: number;
    marginTop?: number;
    marginBottom?: number;
    background?: string;
    onClick?: () => void;
    onMouseDown?: () => void;
    onMouseUp?: () => void;
    onMouseMove?: () => void;
}

export function Div(content?: Content, params?: Params) {
    const el = document.createElement('div');

    if (params?.id) el.id = params.id;
    if (params?.className) el.className = params.className;
    if (params?.marginLeft) el.style.marginLeft = `${params.marginLeft}px`;
    if (params?.marginTop) el.style.marginTop = `${params.marginTop}px`;
    if (params?.marginBottom) el.style.marginBottom = `${params.marginBottom}px`;
    if (params?.background) el.style.background = params.background;
    if (params?.onClick) el.onclick = params.onClick;
    if (params?.onMouseDown) el.onmousedown = params.onMouseDown;
    if (params?.onMouseUp) el.onmouseup = params.onMouseUp;
    if (params?.onMouseMove) el.onmousemove = params.onMouseMove;

    insertContent(el, content);

    return el;
}
