import { Attrs } from "types";
import { applyCommonAttrs } from "utils";

interface Params extends Attrs {
    alt?: string;
    title?: string;
}

export function Img(src: string, params?: Params) {
    const el = document.createElement('img');

    el.src = src;

    if (params?.alt) el.alt = params.alt;
    if (params?.title) el.title = params.title;

    applyCommonAttrs(el, params);

    return el;
}
