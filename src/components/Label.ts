import { Content, insertContent } from "utils";

export function Label(label: string, content?: Content): HTMLLabelElement {
    const el = document.createElement('label');
    insertContent(el, label);
    insertContent(el, content);
    return el;
}
