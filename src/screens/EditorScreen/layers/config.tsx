import { ReactNode } from 'react';

import { StoreConfig } from 'hooks/createStoreHook';
import { LAYER_TYPE } from 'types';

import { HexBrushes } from './height/HexBrushes';
import { heightMapStoreConfig } from './height/store';
import { ToggleGridButton } from './height/ToggleGridButton';
import { imageMapStoreConfig } from './image/store';
import { MapStore, MapStoreWithMap, OtherMap } from './types';
import { waterMapStoreConfig } from './water/store';

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
        config: heightMapStoreConfig as StoreConfig<MapStore>,
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
