import { Attrs, Content } from "types";
import { applyCommonAttrs, insertContent } from "utils";

export function Label(label: string, content?: Content, params?: Attrs) {
    const el = document.createElement('label');

    applyCommonAttrs(el, params);
    insertContent(el, label);
    insertContent(el, content);

    return el;
}
