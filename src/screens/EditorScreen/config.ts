import { brushStoreConfig } from './layersConfig/hex/stores/brushStore';
import { gridStoreConfig } from './layersConfig/hex/stores/gridSwitchStore';
import { hexMapStoreConfig } from './layersConfig/hex/stores/hexMapStore';
import { imageMapStoreConfig } from './layersConfig/image/imageMapStore';
import { mapMovementParamsConfig } from './layersConfig/mapMovingStore';
import { layerStoreConfig } from './layerStore';

export const editorScreenConfigs = [
    layerStoreConfig,
    hexMapStoreConfig,
    imageMapStoreConfig,
    brushStoreConfig,
    gridStoreConfig,
    mapMovementParamsConfig,
];
