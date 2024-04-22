import { Content } from "types";
import { insertContent } from "utils";

export function Label(label: string, content?: Content) {
    const el = document.createElement('label');
    insertContent(el, label);
    insertContent(el, content);
    return el;
}
