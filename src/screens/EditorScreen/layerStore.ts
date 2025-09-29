import { createStoreHook } from 'hooks/createStoreHook';
import { IHexMapParams, LAYER_TYPE } from 'types';

type IStore = { layer: LAYER_TYPE.image } | (IHexMapParams & { layer: LAYER_TYPE.hex });

const [useLayerObservableStore] = createStoreHook<IStore>({ layer: LAYER_TYPE.image });

export { useLayerObservableStore };
