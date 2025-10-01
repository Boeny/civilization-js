import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';

interface IStore {
    data: HTMLImageElement | null;
    zoom: number;
    position: IPoint;
    width: number;
    height: number;
}

const [useImageMapObservableStore, useImageMapStore] = createStoreHook<IStore>({
    data: null,
    zoom: 1,
    position: { x: 0, y: 0 },
    width: 0,
    height: 0,
});

export { useImageMapObservableStore, useImageMapStore };
