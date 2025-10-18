import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';

import { brushStoreConfig } from './layersConfig/hex/stores/brushStore';
import { gridStoreConfig } from './layersConfig/hex/stores/gridSwitchStore';
import { hexMapStoreConfig } from './layersConfig/hex/stores/hexMapStore';
import { imageMapStoreConfig } from './layersConfig/image/imageMapStore';
import { waterMapStoreConfig } from './layersConfig/water/waterMapStore';
import { layerStoreConfig } from './layerStore';

export const editorScreenConfigs = [
    layerStoreConfig,
    brushStoreConfig,
    gridStoreConfig,
    mapMovementParamsConfig,
    imageMapStoreConfig,
    hexMapStoreConfig,
    waterMapStoreConfig,
];
