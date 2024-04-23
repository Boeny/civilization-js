export enum HEX_TYPE {
    ocean,
    sea,
    desert,
    dirt,
    wet,
    tundra,
    snow,
    ice,
    mountain,
    hill,
}

export const HEX_TYPES_COUNT = Object.keys(HEX_TYPE).length / 2; // enum object contains both number and literal keys

export const HEX_COLOR = {
    [HEX_TYPE.ocean]: 'blue',
    [HEX_TYPE.sea]: 'lightblue',
    [HEX_TYPE.desert]: 'lightyellow',
    [HEX_TYPE.dirt]: 'lightbrown',
    [HEX_TYPE.wet]: 'green',
    [HEX_TYPE.tundra]: 'lightgreen',
    [HEX_TYPE.snow]: 'lightgray',
    [HEX_TYPE.ice]: 'white',
    [HEX_TYPE.mountain]: 'brown',
    [HEX_TYPE.hill]: 'yellow',
}
