import './Button.css';
import { Attrs, Content } from "types";
import { applyCommonAttrs, getClasses, insertContent } from "utils";

export interface Params extends Attrs {
    disabled?: boolean;
}

export function Button(content: Content, {className, disabled, ...params}: Params) {
    const el = document.createElement('button');

    el.className = getClasses(['button', className]);

    if (disabled) el.disabled = disabled;

    applyCommonAttrs(el, params);
    insertContent(el, content);

    return el;
}
