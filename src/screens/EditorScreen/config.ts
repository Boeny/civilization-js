import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';

import { hexMapStoreConfig } from './layers/hex/store';
import { brushStoreConfig } from './layers/hex/stores/brushStore';
import { gridStoreConfig } from './layers/hex/stores/gridSwitchStore';
import { imageMapStoreConfig } from './layers/image/store';
import { waterMapStoreConfig } from './layers/water/store';
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
