import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';

import { heightMapStoreConfig } from './layers/height/store';
import { brushStoreConfig } from './layers/height/stores/brushStore';
import { gridStoreConfig } from './layers/height/stores/gridSwitchStore';
import { imageMapStoreConfig } from './layers/image/store';
import { waterMapStoreConfig } from './layers/water/store';
import { layerStoreConfig } from './layerStore';

export const editorScreenConfigs = [
    layerStoreConfig,
    brushStoreConfig,
    gridStoreConfig,
    mapMovementParamsConfig,
    imageMapStoreConfig,
    heightMapStoreConfig,
    waterMapStoreConfig,
];
