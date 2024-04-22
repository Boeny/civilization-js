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
