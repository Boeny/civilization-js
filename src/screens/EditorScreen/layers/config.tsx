import { ReactNode } from 'react';

import { StoreConfig } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';

import { HexBrushes } from './hex/HexBrushes';
import { hexMapStoreConfig } from './hex/stores/hexMapStore';
import { ToggleGridButton } from './hex/ToggleGridButton';
import { imageMapStoreConfig } from './image/imageMapStore';
import { MapStore, MapStoreWithMap, OtherMap } from './types';
import { waterMapStoreConfig } from './water/waterMapStore';

export const LAYER_CONFIG: Record<
    LAYER_TYPE,
    {
        title: string;
        config: StoreConfig<MapStore>;
        topPanelContent?: ReactNode;
        leftPanelContent?: ReactNode;
    }
> = {
    [LAYER_TYPE.image]: {
        title: 'Image',
        config: imageMapStoreConfig as StoreConfig<MapStore>,
    },
    [LAYER_TYPE.height]: {
        title: 'Height map',
        config: hexMapStoreConfig as StoreConfig<MapStore>,
        topPanelContent: <ToggleGridButton />,
        leftPanelContent: <HexBrushes />,
    },
    [LAYER_TYPE.water]: {
        title: 'Water map',
        config: waterMapStoreConfig as StoreConfig<MapStore>,
    },
};

export function getLayerTypes(): LAYER_TYPE[] {
    return Object.values(LAYER_TYPE);
}

export function getMapsWithoutCurrent(currentType: LAYER_TYPE): OtherMap[] {
    return getLayerTypes()
        .map((type) => ({
            type,
            ...(LAYER_CONFIG[type].config.store as MapStoreWithMap),
        }))
        .filter(({ type, map }) => type !== currentType && map);
}
