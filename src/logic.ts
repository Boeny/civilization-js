import { MapData, MapDataRow } from "types";
import { HEX_TYPES_COUNT } from "const";
import { getAsyncCallback, range } from "utils";

export function isValuePositiveNumber(value: number): boolean {
    return value > 0;
}

export function isValueNumber(value: number): boolean {
    return !isNaN(value);
}

export function isValueNonNegativeNumber(value: number): boolean {
    return value >= 0;
}

export function isValueSmallNumber(value: number): boolean {
    return value <= 99999;
}

async function generateRandomMapRow(width: number): Promise<MapDataRow> {
    const result: MapDataRow = [];

    for (let i = 0; i < width; i += 1) {
        const type = await getAsyncCallback(() => Math.floor(Math.random() * HEX_TYPES_COUNT));
        result.push(type);
    }

    return result;
}

export async function generateRandomMapData(width: number, height: number, callback: (n: number) => void): Promise<MapData> {
    const result: MapData = [];

    for (let i = 0; i < height; i += 1) {
        const row = await generateRandomMapRow(width);
        callback(width * i);
        result.push(row);
    }

    return result;
}
