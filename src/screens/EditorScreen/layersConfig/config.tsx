import { FC, ReactNode } from 'react';

import { LAYER_TYPE } from 'types';

import { HexBrushes } from './hex/HexBrushes';
import { HexMap } from './hex/HexMap';
import { HexMiniMap } from './hex/HexMiniMap';
import { ToggleGridButton } from './hex/ToggleGridButton';
import { ImageMap } from './image/ImageMap';
import { ImageMiniMap } from './image/ImageMiniMap';
import { IMapProps, IMiniMapProps } from './types';

export const LAYER_CONFIG: Record<
    LAYER_TYPE,
    {
        title: string;
        miniMapComponent: FC<IMiniMapProps>;
        mapComponent: FC<IMapProps>;
        topPanelContent?: ReactNode;
        leftPanelContent?: ReactNode;
    }
> = {
    [LAYER_TYPE.image]: {
        title: 'Image',
        miniMapComponent: ImageMiniMap,
        mapComponent: ImageMap,
    },
    [LAYER_TYPE.hex]: {
        title: 'Hexagonal base map',
        miniMapComponent: HexMiniMap,
        mapComponent: HexMap,
        topPanelContent: <ToggleGridButton />,
        leftPanelContent: <HexBrushes />,
    },
};

export function getLayers(): LAYER_TYPE[] {
    return Object.keys(LAYER_CONFIG).map(Number);
}
