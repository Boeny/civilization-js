import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';
import { getZeroVector } from 'utils';

import { HexMapData } from '../types';

interface IStore {
    data: HexMapData | null;
    hexWidth: number;
    isVisible: boolean;
    opacity: number;
    position: IPoint;
    zoom: number;
}

const [useHexMapObservableStore, hexMapStoreConfig] = createStoreHook<IStore>({
    data: null,
    hexWidth: 100,
    isVisible: true,
    opacity: 1,
    position: getZeroVector(),
    zoom: 1,
});

export { useHexMapObservableStore, hexMapStoreConfig };
