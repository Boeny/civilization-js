import { LAYER_TYPE, HEX_TYPE } from 'screens/EditorScreen/types';

import { HexMap } from './Map/HexMap';
import { ImageMap } from './Map/ImageMap';
import { HexMiniMap } from './RightPanel/Layers/MiniMap/HexMiniMap';
import { ImageMiniMap } from './RightPanel/Layers/MiniMap/ImageMiniMap';

export const HEX_CONFIG: Record<HEX_TYPE, { color: string; title: string }> = {
    [HEX_TYPE.ocean]: {
        color: 'rgb(0 138 134)',
        title: 'Ocean',
    },
    [HEX_TYPE.sea]: {
        color: '#02acd2',
        title: 'Sea',
    },
    [HEX_TYPE.desert]: {
        color: '#f2be00',
        title: 'Desert',
    },
    [HEX_TYPE.dirt]: {
        color: '#6c3700',
        title: 'Dirt',
    },
    [HEX_TYPE.meadow]: {
        color: '#008c00',
        title: 'Meadow',
    },
    [HEX_TYPE.tundra]: {
        color: '#a1daa1',
        title: 'Tundra',
    },
    [HEX_TYPE.snow]: {
        color: '#cffaff',
        title: 'Snow',
    },
    [HEX_TYPE.ice]: {
        color: '#ffffff',
        title: 'Ice',
    },
    [HEX_TYPE.mountain]: {
        color: '#a37070',
        title: 'Mountain',
    },
    [HEX_TYPE.hill]: {
        color: '#b0d700',
        title: 'Hill',
    },
};

export const LAYER_CONFIG: Record<
    LAYER_TYPE,
    { title: string; zIndex: number; miniMapComponent?: React.FC<any>; mapComponent?: React.FC<any> }
> = {
    [LAYER_TYPE.image]: { title: 'Image', zIndex: 0, miniMapComponent: ImageMiniMap, mapComponent: ImageMap },
    [LAYER_TYPE.continuous]: { title: 'Continuous map', zIndex: 1 },
    [LAYER_TYPE.hex]: { title: 'Hexagonal base map', zIndex: 2, miniMapComponent: HexMiniMap, mapComponent: HexMap },
    [LAYER_TYPE.objects]: { title: 'Objects map', zIndex: 3 },
    [LAYER_TYPE.borders]: { title: 'Borders', zIndex: 4 },
};

export const SQRT_3 = Math.sqrt(3);

export const TOP_PANEL_HEIGHT = 32;
export const RIGHT_PANEL = { innerWidth: 200, padding: 20 };
export const RIGHT_PANEL_WIDTH = RIGHT_PANEL.innerWidth + RIGHT_PANEL.padding * 2;
