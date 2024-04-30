import { ContentElement } from "types";
import { adaptAndSetAttrs, insertContent } from "utils";

export function observable<T>(id: string, component: (params: T) => ContentElement) {
    const container = document.createElement('observable');
    const cache = {replaceElement: () => {}};

    document.addEventListener(id, () => {
        cache.replaceElement();
    });

    return (params?: T) => {
        cache.replaceElement = () => {
            container.innerHTML = '';
            const element = component(params as any);
            if (element) insertContent(container, element);
        }
        cache.replaceElement();
        return container;
    };
}

export function observableAttrs<T>(id: string, component: (params: T) => ContentElement, attrs: {name: string, value: (params: T) => any}[]) {
    const cache: Record<string, any> = {element: null, setAttrs: () => {}};

    document.addEventListener(id, () => {
        cache.setAttrs();
    })

    return (params?: T) => {
        cache.element = component(params as any);
        cache.setAttrs = () => adaptAndSetAttrs(cache.element, params as any, attrs);
        cache.setAttrs();
        return cache.element;
    }
}
