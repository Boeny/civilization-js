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

export const HEX_TYPES_COUNT = Object.keys(HEX_TYPE).length / 2; // enum object contains both number and literal keys

export const HEX_COLOR: Record<string, string> = {
    [HEX_TYPE.ocean]: 'rgb(0 138 134)',
    [HEX_TYPE.sea]: '#02acd2',
    [HEX_TYPE.desert]: '#f2be00',
    [HEX_TYPE.dirt]: '#6c3700',
    [HEX_TYPE.meadow]: '#008c00',
    [HEX_TYPE.tundra]: '#a1daa1',
    [HEX_TYPE.snow]: '#cffaff',
    [HEX_TYPE.ice]: '#ffffff',
    [HEX_TYPE.mountain]: '#a37070',
    [HEX_TYPE.hill]: '#b0d700',
}

export const HEX_NAME: Record<string, string> = {
    [HEX_TYPE.ocean]: 'Ocean',
    [HEX_TYPE.sea]: 'Sea',
    [HEX_TYPE.desert]: 'Desert',
    [HEX_TYPE.dirt]: 'Dirt',
    [HEX_TYPE.meadow]: 'Wet',
    [HEX_TYPE.tundra]: 'Tundra',
    [HEX_TYPE.snow]: 'Snow',
    [HEX_TYPE.ice]: 'Ice',
    [HEX_TYPE.mountain]: 'Mountain',
    [HEX_TYPE.hill]: 'Hill',
}
