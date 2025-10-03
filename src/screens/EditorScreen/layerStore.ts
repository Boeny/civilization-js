import { createStoreHook } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';

type IStore = { layer: LAYER_TYPE };

const [useLayerObservableStore, layerStoreConfig] = createStoreHook<IStore>({ layer: LAYER_TYPE.image });

export { useLayerObservableStore, layerStoreConfig };
