import { LAYER_TYPE } from 'screens/EditorScreen/types';

import { HexMiniMap } from './MiniMap/HexMiniMap';
import { ImageMiniMap } from './MiniMap/ImageMiniMap';

export const LAYER_CONFIG: Record<LAYER_TYPE, { title: string; zIndex: number; component?: React.FC<any> }> = {
    [LAYER_TYPE.image]: { title: 'Image', zIndex: 0, component: ImageMiniMap },
    [LAYER_TYPE.continuous]: { title: 'Continuous map', zIndex: 1 },
    [LAYER_TYPE.hex]: { title: 'Hexagonal base map', zIndex: 2, component: HexMiniMap },
    [LAYER_TYPE.objects]: { title: 'Objects map', zIndex: 3 },
    [LAYER_TYPE.borders]: { title: 'Borders', zIndex: 4 },
};
