import { insertContent } from "utils";

export function observable<T>(id: string, component: (params: T) => HTMLElement | string) {
    const container = document.createElement('observable');
    const cache = {replaceElement: () => {}};

    document.addEventListener(id, () => {
        cache.replaceElement();
    });

    return (params?: T) => {
        cache.replaceElement = () => {
            container.innerHTML = '';
            insertContent(container, component(params as any));
        }
        cache.replaceElement();
        return container;
    };
}

export function observableAttrs<T>(id: string, component: (params: T) => HTMLElement, attrs: {name: string, value: () => any}[]) {
    const cache: Record<string, any> = {element: null, setAttrs: () => {}};

    document.addEventListener(id, () => {
        cache.setAttrs();
    })

    return (params?: T) => {
        cache.element = component(params as any);
        cache.setAttrs = () => attrs.forEach((attr) => cache.element[attr.name] = attr.value());
        cache.setAttrs();
        return cache.element;
    }
}
