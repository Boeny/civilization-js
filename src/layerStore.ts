import { useStore } from 'hooks/useStore';
import { IHexMapParams, LAYER_TYPE } from 'types';

type IStore = { layer: LAYER_TYPE.image } | (IHexMapParams & { layer: LAYER_TYPE.hex });

const [useLayerObservableStore, useLayerStore] = useStore<IStore>({ layer: LAYER_TYPE.image });

export { useLayerObservableStore, useLayerStore };
