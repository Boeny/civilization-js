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
import { IMapProps, IMiniMapProps, MapStore, MapStoreWithMap, OtherMap } from './types';
import { Map as WaterMap } from './water/Map';
import { MiniMap as WaterMiniMap } from './water/MiniMap';
import { waterMapStoreConfig } from './water/waterMapStore';

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
    [LAYER_TYPE.height]: {
        title: 'Height map',
        config: hexMapStoreConfig as StoreConfig<MapStore>,
        miniMapComponent: HexMiniMap,
        mapComponent: HexMap,
        topPanelContent: <ToggleGridButton />,
        leftPanelContent: <HexBrushes />,
    },
    [LAYER_TYPE.water]: {
        title: 'Water map',
        config: waterMapStoreConfig as StoreConfig<MapStore>,
        miniMapComponent: WaterMiniMap,
        mapComponent: WaterMap,
    },
};

export function getLayerTypes(): LAYER_TYPE[] {
    return Object.keys(LAYER_CONFIG).map(Number);
}

export function getLayer(type: LAYER_TYPE) {
    return LAYER_CONFIG[type];
}

export function getMapsWithoutCurrent(currentType: LAYER_TYPE): OtherMap[] {
    return getLayerTypes()
        .map((type) => ({
            type,
            ...(getLayer(type).config.store as MapStoreWithMap),
        }))
        .filter(({ type, map }) => type !== currentType && map);
}
