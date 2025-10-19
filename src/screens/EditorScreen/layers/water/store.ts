import { createStoreHook } from 'hooks/createStoreHook';
import { getZeroVector } from 'utils';

import { HexMapStore } from '../height/store';

const [useStore, waterMapStoreConfig] = createStoreHook<HexMapStore>({
    map: null,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
});

export { useStore, waterMapStoreConfig };
