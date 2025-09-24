import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';

interface IStore {
    data: HTMLImageElement | null;
    zoom: number;
    position: IPoint;
    opacity: number;
    width: number;
    height: number;
}

const [useImageMapObservableStore] = createStoreHook<IStore>({
    data: null,
    zoom: 1,
    position: { x: 0, y: 0 },
    opacity: 1,
    width: 0,
    height: 0,
});

export { useImageMapObservableStore };
