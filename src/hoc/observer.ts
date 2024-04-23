import { insertContent } from "utils";

const cache: Record<string, () => void> = {};

export function observable(id: string, component: () => HTMLElement) {
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
