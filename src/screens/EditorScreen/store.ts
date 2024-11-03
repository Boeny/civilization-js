import { useStore } from 'hoc/useStore';

import { HEX_TYPE, LAYER_TYPE, MapData } from './types';

interface IStore {
    brush: HEX_TYPE | null;
    layer: LAYER_TYPE;
    hexWidth: number;
    data: Partial<Record<LAYER_TYPE, MapData | ImageBitmap | null>>;
    visibility: Partial<Record<LAYER_TYPE, boolean>>;
}

const store: IStore = {
    brush: null,
    layer: LAYER_TYPE.image,
    hexWidth: 0,
    data: {},
    visibility: {},
};

const [useEditorStore] = useStore(store);

export { useEditorStore };
