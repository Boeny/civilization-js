import { useStore } from 'hooks/useStore';

import { HEX_TYPE, LAYER_TYPE, MapData } from './types';

interface IStore {
    brush: HEX_TYPE | null;
    layer: LAYER_TYPE;
    hexWidth: number;
    data: Partial<Record<LAYER_TYPE, MapData | HTMLImageElement | null>>;
    visibility: Record<LAYER_TYPE, boolean>;
}

export const DEFAULT_EDITOR_STATE: IStore = {
    brush: null,
    layer: LAYER_TYPE.image,
    hexWidth: 0,
    data: {},
    visibility: {} as Record<LAYER_TYPE, boolean>,
};

const [useEditorStore] = useStore<IStore>({ ...DEFAULT_EDITOR_STATE });

export { useEditorStore };
