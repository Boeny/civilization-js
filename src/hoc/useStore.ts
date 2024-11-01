import { useEffect, useState } from 'react';

interface StoreUpdate<S extends object> {
    (data: Partial<S>): void;
}

export function useStore<T extends object>(store: T): [(defaultState?: Partial<T>) => [T, StoreUpdate<T>], () => [T, StoreUpdate<T>]] {
    const storeUpdateStack: (() => void)[] = [];

    const setStore: StoreUpdate<T> = (data: Partial<T>) => {
        Object.assign(store, data);
        storeUpdateStack.forEach((callback) => callback());
    };

    function useUpdatableStore(defaultState?: Partial<T>): [T, StoreUpdate<T>] {
        const [, update] = useState(
            defaultState
                ? () => {
                      // init store - one time during first render
                      Object.assign(store, defaultState);

                      return {};
                  }
                : {},
        );

        useEffect(() => {
            // add state updater to the stack after mount
            function updateFunc() {
                update({});
            }
            storeUpdateStack.push(updateFunc);

            // remove updateFunc from the stack before unmount
            return () => {
                const index = storeUpdateStack.indexOf(updateFunc);
                storeUpdateStack.splice(index, 1);
            };
        }, []);

        return [store, setStore];
    }
    function useStoreWithoutUpdate(): [T, StoreUpdate<T>] {
        return [store, setStore];
    }

    return [useUpdatableStore, useStoreWithoutUpdate];
}
