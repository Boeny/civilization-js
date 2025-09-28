import { createStoreHook } from 'hooks/createStoreHook';
import { IPoint } from 'types';

import { HexMapData } from '../types';

interface IStore {
    data: HexMapData | null;
    hexWidth: number;
    isVisible: boolean;
    opacity: number;
    position: IPoint;
    zoom: number;
}

const [useHexMapObservableStore] = createStoreHook<IStore>({
    data: null,
    hexWidth: 100,
    isVisible: true,
    opacity: 1,
    position: { x: 0, y: 0 },
    zoom: 1,
});

export { useHexMapObservableStore };
