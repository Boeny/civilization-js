import { FC, ReactNode } from 'react';

import { StoreConfig } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';
import { getVector } from 'utils';

import { HexBrushes } from './hex/HexBrushes';
import { HexMap } from './hex/HexMap';
import { HexMiniMap } from './hex/HexMiniMap';
import { hexMapStoreConfig } from './hex/stores/hexMapStore';
import { ToggleGridButton } from './hex/ToggleGridButton';
import { ImageMap } from './image/ImageMap';
import { imageMapStoreConfig } from './image/imageMapStore';
import { ImageMiniMap } from './image/ImageMiniMap';
import { IMapProps, IMiniMapProps, MapStore } from './types';

const LAYER_CONFIG: Record<
    LAYER_TYPE,
    {
        title: string;
        config: StoreConfig<MapStore>;
        miniMapComponent: FC<IMiniMapProps>;
        mapComponent: FC<IMapProps>;
        topPanelContent?: ReactNode;
        leftPanelContent?: ReactNode;
    }
> = {
    [LAYER_TYPE.image]: {
        title: 'Image',
        config: imageMapStoreConfig as StoreConfig<MapStore>,
        miniMapComponent: ImageMiniMap,
        mapComponent: ImageMap,
    },
    [LAYER_TYPE.hex]: {
        title: 'Hexagonal base map',
        config: hexMapStoreConfig as StoreConfig<MapStore>,
        miniMapComponent: HexMiniMap,
        mapComponent: HexMap,
        topPanelContent: <ToggleGridButton />,
        leftPanelContent: <HexBrushes />,
    },
};

export function getLayerTypes(): LAYER_TYPE[] {
    return Object.keys(LAYER_CONFIG).map(Number);
}

export function getLayer(type: LAYER_TYPE) {
    return LAYER_CONFIG[type];
}

export function getMaps() {
    return getLayerTypes()
        .map((type) => ({ type, map: getLayer(type).config.store.map! }))
        .filter((store) => store.map);
}

export const ZOOM_CONFIG = {
    pixelsInDelta: 40,
    pixelsAddition: 0,
    minWidth: 500,
    maxWidth: 1000000,
};

export const KEY_PAN_SPEED = 40;
export const WHEEL_PAN_SPEED = 5;
export const BORDER_SIZE = getVector(200, 200);
