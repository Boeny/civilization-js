import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { HexMapData } from '../../models';
import { MapStore } from '../../types';

export interface HexMapStore extends MapStore {
    map: HexMapData | null;
    isVisible: boolean;
    opacity: number;
    position: IPoint;
    zoom: number;
}

const [useHexMapStore, hexMapStoreConfig] = createStoreHook<HexMapStore>({
    map: null,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
});

export { useHexMapStore, hexMapStoreConfig };
