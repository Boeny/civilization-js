import { useStore } from 'hooks/useStore';

export interface IStore<T> {
    name: string;
    value: T;
    onChange: (value: T) => void;
}

const [useRadioStoreT] = useStore({} as IStore<number | string>);

export const useRadioStore = <T extends string | number>(defaultState?: Partial<IStore<T>>) => useRadioStoreT(defaultState as any);
