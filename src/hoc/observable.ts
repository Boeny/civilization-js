import { insertContent } from "utils";

const cache: Record<string, () => void> = {};

export function observable(id: string, component: () => HTMLElement | string) {
    const container = document.createElement('observable');
    insertContent(container, component());

    let callback = cache[id];

    if (callback) {
        document.removeEventListener(id, callback)
    }

    callback = () => {
        container.innerHTML = '';
        insertContent(container, component());
    }

    document.addEventListener(id, callback);
    cache[id] = callback;

    return container;
}

export function observableAttrs(id: string, element: HTMLElement | string, params: {name: string, value: () => any}[]) {
    let callback = cache[id];

    if (callback) {
        document.removeEventListener(id, callback)
    }

    callback = () => {
        params.forEach((param) => (element as any)[param.name] = param.value())
    }

    document.addEventListener(id, callback);
    cache[id] = callback;

    return element;
}
