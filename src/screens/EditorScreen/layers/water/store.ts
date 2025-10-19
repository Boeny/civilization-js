import { createStoreHook } from 'hooks/createStoreHook';
import { getZeroVector } from 'utils';

import { HexMapStore } from '../height/store';
import { HexMapData } from '../models';

interface WaterMapStore extends Omit<HexMapStore, 'hasImageMap'> {
    map: HexMapData | null;
}

const [useStore, waterMapStoreConfig] = createStoreHook<WaterMapStore>({
    map: null,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
});

export { useStore, waterMapStoreConfig };
