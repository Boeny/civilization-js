import { useEffect, useState } from 'react';

type DefaultState<T extends object> = Partial<T>;

interface StoreUpdate<S extends object> {
    (data: Partial<S>): void;
}

type UseStore<T extends object> = [T, StoreUpdate<T>];

export function useStore<T extends object>(store: T): [(defaultState?: DefaultState<T>) => UseStore<T>, () => UseStore<T>] {
    const storeUpdateStack: (() => void)[] = [];

    const setStore: StoreUpdate<T> = (data: Partial<T>) => {
        Object.assign(store, data);
        storeUpdateStack.forEach((callback) => callback());
    };

    function useUpdatableStore(defaultState?: DefaultState<T>): UseStore<T> {
        const [, update] = useState<{}>(
            defaultState
                ? () => {
                      Object.assign(store, defaultState);
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
    function useStoreWithoutUpdate(): UseStore<T> {
        return [store, setStore];
    }

    return [useUpdatableStore, useStoreWithoutUpdate];
}
