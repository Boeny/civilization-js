import { useStore } from 'hooks/useStore';
import { LAYER_TYPE } from 'types';

import { HEX_TYPE, MapData } from './types';

interface IStore {
    brush: HEX_TYPE | null;
    layer: LAYER_TYPE;
    hexWidth: number;
    data: Partial<Record<LAYER_TYPE, MapData | HTMLImageElement | null>>;
}

export const DEFAULT_EDITOR_STATE: IStore = {
    brush: null,
    layer: LAYER_TYPE.image,
    hexWidth: 100,
    data: {},
};

const [useEditorStore] = useStore<IStore>({ ...DEFAULT_EDITOR_STATE });

export { useEditorStore };
