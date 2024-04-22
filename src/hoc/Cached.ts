let cache: any;

export function CachedHOC<T>(component: (params: T) => HTMLElement) {
    return function(params?: T) {
        if (params) cache = params;
        return component(params || cache);
    }
}
