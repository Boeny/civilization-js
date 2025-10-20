import { createStoreHook } from 'hooks/createStoreHook';
import { getZeroVector } from 'utils';

import { HexMapStore } from '../height/store';
import { HexMapData } from '../models';

interface WaterMapStore extends Omit<HexMapStore, 'hasImageMap'> {
    map: HexMapData | null;
    showCreateButton: boolean;
}

const [useStore, waterMapStoreConfig] = createStoreHook<WaterMapStore>({
    map: null,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
    showCreateButton: false,
});

export { useStore, waterMapStoreConfig };
