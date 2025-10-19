import { EMPTY_COLOR } from 'const';

import { HEX_TYPE } from '../../types';

export const BRUSH_MAP: Record<HEX_TYPE, { color: string; title: string }> = {
    [HEX_TYPE.empty]: {
        color: EMPTY_COLOR,
        title: 'Empty',
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

export function getBrushes(): HEX_TYPE[] {
    return Object.keys(BRUSH_MAP).map(Number);
}
