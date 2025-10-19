import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { HexMapData } from '../models';
import { MapStore, HEX_TYPE } from '../types';

export interface HexMapStore extends MapStore {
    map: HexMapData<HEX_TYPE> | null;
    isVisible: boolean;
    opacity: number;
    position: IPoint;
    zoom: number;
    hasImageMap: boolean;
}

const [useStore, heightMapStoreConfig] = createStoreHook<HexMapStore>({
    map: null,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
    hasImageMap: false,
});

export { useStore, heightMapStoreConfig };
