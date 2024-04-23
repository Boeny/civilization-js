let cache: any;

export function CachedHOC<T, Q>(component: (params: T) => Q) {
    return function(params?: T) {
        if (params) cache = params;
        return component(params || cache);
    }
}
