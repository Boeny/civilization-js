/* eslint-disable import/no-unused-modules */
import { HEX_TYPE } from './types';

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

export const SQRT_3 = Math.sqrt(3);

export const TOP_PANEL_HEIGHT = 32;
export const RIGHT_PANEL = { innerWidth: 200, padding: 20 };
export const RIGHT_PANEL_WIDTH = RIGHT_PANEL.innerWidth + RIGHT_PANEL.padding * 2;
