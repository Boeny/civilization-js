import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { MapStore } from '../types';

interface ImageMapStore extends MapStore {
    map: HTMLImageElement | null;
    zoom: number;
    position: IPoint;
}

const [useStore, imageMapStoreConfig] = createStoreHook<ImageMapStore>({
    map: null,
    zoom: 1,
    position: getZeroVector(),
});

export { useStore, imageMapStoreConfig };
