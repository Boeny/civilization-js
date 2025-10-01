import { createStoreHook } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';

type IStore = { layer: LAYER_TYPE };

const [useLayerObservableStore, useLayerStore] = createStoreHook<IStore>({ layer: LAYER_TYPE.image });

export { useLayerObservableStore, useLayerStore };
