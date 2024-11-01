import { useStore } from 'hoc/useStore';

import { HEX_TYPE, LAYER_TYPE, MapData } from './types';

interface IStore {
    brush: HEX_TYPE | null;
    layer: LAYER_TYPE;
    isPainting: boolean;
    hexWidth: number;
    data: Partial<Record<LAYER_TYPE, MapData | CanvasImageSource | null>>;
    visibility: Partial<Record<LAYER_TYPE, boolean>>;
}

const store: IStore = {
    brush: null,
    layer: LAYER_TYPE.image,
    isPainting: false,
    hexWidth: 0,
    data: {},
    visibility: {},
};

const [useEditorStore, useEditorStoreWithoutUpdate] = useStore(store);

// eslint-disable-next-line import/no-unused-modules
export { useEditorStore, useEditorStoreWithoutUpdate };
