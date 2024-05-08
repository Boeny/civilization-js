import { HEX_TYPE, LAYER_TYPE } from "./types"

export const IMAGE_MAP_UPDATE_EVENT = 'image-map-update'
//export const IMAGE_MINI_MAP_UPDATE_EVENT = 'image-mini-map-update'
export const HEX_MAP_UPDATE_EVENT = 'hex-map-update'
export const HEX_MINI_MAP_UPDATE_EVENT = 'hex-mini-map-update'
export const LEFT_PANEL_TOGGLE_EVENT = 'toggle-left-panel'
export const RIGHT_PANEL_TOGGLE_EVENT = 'toggle-right-panel'
export const LAYER_CHANGE_EVENT = 'layer-change'

export const LAYER_TYPE_TO_MAP_STORE: Record<LAYER_TYPE, 'imageMapData' | 'hexMapData' | null> = {
    [LAYER_TYPE.image]: 'imageMapData',
    [LAYER_TYPE.continuous]: null,
    [LAYER_TYPE.hex]: 'hexMapData',
    [LAYER_TYPE.objects]: null,
    [LAYER_TYPE.borders]: null,
}

export const HEX_CONFIG: Record<HEX_TYPE, {color: string, title: string}> = {
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
}

export const LAYER_CONFIG: Record<LAYER_TYPE, {title: string, zIndex: number}> = {
    [LAYER_TYPE.image]: {title: 'Image', zIndex: 0},
    [LAYER_TYPE.continuous]: {title: 'Continuous map', zIndex: 1},
    [LAYER_TYPE.hex]: {title: 'Hexagonal base map', zIndex: 2},
    [LAYER_TYPE.objects]: {title: 'Objects map', zIndex: 3},
    [LAYER_TYPE.borders]: {title: 'Borders', zIndex: 4},
}

export const SQRT_3 = Math.sqrt(3)
