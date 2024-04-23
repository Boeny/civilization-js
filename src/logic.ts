import { MapData } from "types";

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

export function generateEmptyMapData(width: number, height: number): MapData {
    return Array.from({length: height}).map(() => Array.from({length: width}));
}
