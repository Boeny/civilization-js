import './Button.css';
import { Content, getClasses, insertContent } from "utils";

interface Params {
    id?: string;
    className?: string;
    onClick: (() => void) | (() => void)[];
}

export function Button(content: Content, {onClick, className, id}: Params): HTMLButtonElement {
    const el = document.createElement('button');

    if (id) el.id = id;
    el.className = getClasses(['button', className]);
    el.onclick = Array.isArray(onClick) ? () => onClick.forEach((callback) => callback()) : onClick;

    insertContent(el, content);

    return el;
}
