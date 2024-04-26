import './Button.css';
import { Attrs, Content } from "types";
import { applyCommonAttrs, getClasses, insertContent } from "utils";

export interface Params extends Attrs {
}

export function Button(content: Content, {className, ...params}: Params) {
    const el = document.createElement('button');

    el.className = getClasses(['button', className]);

    applyCommonAttrs(el, params);
    insertContent(el, content);

    return el;
}
