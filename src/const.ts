export enum MENU_TYPE {
    main,
    newGameParams,
    editorParams,
    options,
    editorScreen,
    gameScreen,
}

export enum SCREEN_TYPE {
    editor,
    game,
}

export enum KEY_CODE {
    esc = 'Escape',
    enter = 'Enter',
}

export enum HEX_TYPE {
    ocean,
    sea,
    desert,
    dirt,
    meadow,
    tundra,
    snow,
    ice,
    mountain,
    hill,
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

export enum LAYER_TYPE {
    image,
    continuous,
    hex,
    objects,
    borders,
}

export const LAYER_CONFIG: Record<LAYER_TYPE, {title: string}> = {
    [LAYER_TYPE.image]: {title: 'Image'},
    [LAYER_TYPE.continuous]: {title: 'Continuous map'},
    [LAYER_TYPE.hex]: {title: 'Hexagonal base map'},
    [LAYER_TYPE.objects]: {title: 'Objects map'},
    [LAYER_TYPE.borders]: {title: 'Borders'},
}

export const SQRT_3 = Math.sqrt(3)

export const ATTRS_MAP = {
    id: 'id',
    className: 'className',
    width: 'width',
    height: 'height',
    disabled: 'disabled',
    alt: 'alt',
    title: 'title',
    type: 'type',
    autoFocus: 'autofocus',
    onClick: 'onclick',
    onMouseDown: 'onmousedown',
    onMouseUp: 'onmouseup',
    onMouseMove: 'onmousemove',
} as const
