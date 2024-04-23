const cache = new WeakMap();

export function cached<T, Q>(component: (params: T) => Q) {
    return function(params?: T) {
        if (params) cache.set(component, params);
        return component(params || cache.get(component));
    }
}
