import { FC } from 'react';

import { HexMap } from './Map/HexMap';
import { ImageMap } from './Map/ImageMap';
import { IMapProps } from './Map/types';
import { HexMiniMap } from './RightPanel/Layers/MiniMap/HexMiniMap';
import { ImageMiniMap } from './RightPanel/Layers/MiniMap/ImageMiniMap';
import { IMiniMapProps } from './RightPanel/Layers/MiniMap/types';
import { LAYER_TYPE } from './types';

export const LAYER_CONFIG: Record<
    LAYER_TYPE,
    {
        title: string;
        zIndex: number;
        miniMapComponent?: FC<IMiniMapProps<any>>;
        mapComponent?: FC<IMapProps<any>>;
    }
> = {
    [LAYER_TYPE.image]: { title: 'Image', zIndex: 0, miniMapComponent: ImageMiniMap, mapComponent: ImageMap },
    [LAYER_TYPE.continuous]: { title: 'Continuous map', zIndex: 1 },
    [LAYER_TYPE.hex]: { title: 'Hexagonal base map', zIndex: 2, miniMapComponent: HexMiniMap, mapComponent: HexMap },
    [LAYER_TYPE.objects]: { title: 'Objects map', zIndex: 3 },
    [LAYER_TYPE.borders]: { title: 'Borders', zIndex: 4 },
};
