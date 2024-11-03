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

export enum LAYER_TYPE {
    image,
    continuous,
    hex,
    objects,
    borders,
}

export interface IHexMapParams {
    width: number;
    height: number;
    hexWidth: number;
}

export type HexMapField = keyof IHexMapParams;

export type MapData = HEX_TYPE[][];
