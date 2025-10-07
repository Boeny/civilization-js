import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { MapStore } from '../../types';
import { HexMapData } from '../models';
import { CREATE_TYPE } from '../types';

interface HexMapStore extends MapStore {
    map: HexMapData | null;
    isVisible: boolean;
    opacity: number;
    position: IPoint;
    zoom: number;
    createType: CREATE_TYPE;
}

const [useHexMapStore, hexMapStoreConfig] = createStoreHook<HexMapStore>({
    map: null,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
    createType: CREATE_TYPE.fitScreen,
});

export { useHexMapStore, hexMapStoreConfig };
