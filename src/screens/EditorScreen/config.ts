import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';

import { brushStoreConfig } from './layers/hex/stores/brushStore';
import { gridStoreConfig } from './layers/hex/stores/gridSwitchStore';
import { hexMapStoreConfig } from './layers/hex/stores/hexMapStore';
import { imageMapStoreConfig } from './layers/image/imageMapStore';
import { waterMapStoreConfig } from './layers/water/waterMapStore';
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
