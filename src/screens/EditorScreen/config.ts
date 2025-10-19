import { mapMovementParamsConfig } from 'hooks/useMapMoving/mapMovingStore';

import { brushStoreConfig } from './layers/components/HexBrushes/store';
import { gridStoreConfig } from './layers/components/ToggleGridButton/store';
import { heightMapStoreConfig } from './layers/height/store';
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
