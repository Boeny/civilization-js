import { createStoreHook } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';

type IStore = { layer: LAYER_TYPE };

const [useLayerStore, layerStoreConfig] = createStoreHook<IStore>({ layer: LAYER_TYPE.image });

export { useLayerStore, layerStoreConfig };
