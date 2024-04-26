const cache = new WeakMap();

/**
 * Return component which could have empty params because they are cached
 * @param component
 * @returns
 */
export function cacheParams<T, Q>(component: (params: T) => Q) {
    return function(params?: T) {
        if (params) cache.set(component, params);
        return component(params || cache.get(component));
    }
}
