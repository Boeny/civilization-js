import { useEffect, useState } from 'react';

type DefaultState<T extends object> = Partial<T>;

interface StoreUpdate<S extends object> {
    (data: Partial<S>): void;
}

type UseStore<T extends object> = { store: T; setStore: StoreUpdate<T>; reset: () => void };

export function createStoreHook<T extends object>(defaultState: T) {
    // one instance for each createStoreHook call
    const container = {
        instance: { ...defaultState },
        getStore() {
            return this.instance;
        },
        update(data: Partial<T>) {
            this.instance = { ...this.instance, ...data };
        },
    };
    const storeUpdateStack: (() => void)[] = [];

    function setStore(data: Partial<T>) {
        container.update(data);
        storeUpdateStack.forEach((callback) => callback());
    }

    function reset() {
        setStore(defaultState);
    }

    function useUpdatableStore(newDefaultState?: DefaultState<T>): UseStore<T> {
        const [, forceUpdate] = useState(() => {
            if (newDefaultState) {
                container.update(newDefaultState);
            }

            return {};
        });

        useEffect(() => {
            // add state updater to the stack after mount
            function triggerComponentUpdate() {
                forceUpdate({});
            }
            storeUpdateStack.push(triggerComponentUpdate);

            // remove updateFunc from the stack before unmount
            return () => {
                const index = storeUpdateStack.indexOf(triggerComponentUpdate);
                storeUpdateStack.splice(index, 1);
            };
        }, []);

        return {
            get store() {
                return container.getStore();
            },
            setStore,
            reset,
        };
    }

    function useStoreWithoutUpdate(): UseStore<T> {
        return {
            get store() {
                return container.getStore();
            },
            setStore,
            reset,
        };
    }

    return [useUpdatableStore, useStoreWithoutUpdate] as const;
}
