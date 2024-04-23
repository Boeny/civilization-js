import './Button.css';
import { Content } from "types";
import { getClasses, insertContent } from "utils";

interface Params {
    id?: string;
    className?: string;
    background?: string;
    onClick: (() => void) | (() => void)[];
}

export function Button(content: Content, {onClick, className, id, background}: Params) {
    const el = document.createElement('button');

    if (id) el.id = id;
    if (background) el.style.background = background;

    el.className = getClasses(['button', className]);
    el.onclick = Array.isArray(onClick) ? () => onClick.forEach((callback) => callback()) : () => onClick();

    insertContent(el, content);

    return el;
}
