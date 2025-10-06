import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

interface ImageMapStore {
    data: HTMLImageElement | null;
    zoom: number;
    position: IPoint;
    width: number;
    height: number;
}

const [useImageMapObservableStore, imageMapStoreConfig] = createStoreHook<ImageMapStore>({
    data: null,
    zoom: 1,
    position: getZeroVector(),
    width: 0,
    height: 0,
});

export { useImageMapObservableStore, imageMapStoreConfig };
