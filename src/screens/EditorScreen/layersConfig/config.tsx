import { FC, ReactNode } from 'react';

import { StoreConfig } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';

import { HexBrushes } from './hex/HexBrushes';
import { Map as HexMap } from './hex/Map';
import { MiniMap as HexMiniMap } from './hex/MiniMap';
import { hexMapStoreConfig } from './hex/stores/hexMapStore';
import { ToggleGridButton } from './hex/ToggleGridButton';
import { imageMapStoreConfig } from './image/imageMapStore';
import { Map as ImageMap } from './image/Map';
import { MiniMap as ImageMiniMap } from './image/MiniMap';
import { IMap, IMapProps, IMiniMapProps, MapStore } from './types';

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

export function getMapsWithoutCurrent(currentType: LAYER_TYPE): IMap[] {
    return getLayerTypes()
        .filter((type) => type !== currentType && getLayer(type).config.store.map!)
        .map((type) => getLayer(type).config.store.map!);
}
