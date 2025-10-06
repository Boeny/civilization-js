import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { HexMapData } from '../types';

interface HexMapStore {
    data: HexMapData | null;
    hexWidth: number;
    isVisible: boolean;
    opacity: number;
    position: IPoint;
    zoom: number;
}

const [useHexMapStore, hexMapStoreConfig] = createStoreHook<HexMapStore>({
    data: null,
    hexWidth: 100,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
});

export { useHexMapStore, hexMapStoreConfig };
