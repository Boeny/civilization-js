import { MapData } from "types";
import { HEX_TYPES_COUNT } from "const";
import { range } from "utils";

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

export function generateRandomMapData(width: number, height: number): MapData {
    return range(height).map((y) => {
        return range(width).map((x) => {
            return Math.floor(Math.random() * HEX_TYPES_COUNT);
        })
    });
}
