import { PreviousValueStore } from "types/stores"

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

export interface HexMapParams {
    width: number
    height: number
    hexWidth: number
}

export type HexMapField = keyof HexMapParams

export type MapData = number[][]

export type MapDataRow = number[]

export class HexMapStore extends PreviousValueStore<MapData | null> {
    getHex(x: number, y: number): HEX_TYPE {
        const map = this.value
        if (!map) throw new Error('Hex map is not set')

        return map[y][x]
    }

    setHex(x: number, y: number, type: HEX_TYPE) {
        const map = this.value
        if (!map) throw new Error('Hex map is not set')

        map[y][x] = type
    }
}
