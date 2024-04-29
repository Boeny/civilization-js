import { HEX_TYPE } from "const";
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
    return Array.from({length: height}).map(() => Array.from({length: width}).map(() => HEX_TYPE.ocean));
}

export function getMapCoordinatesFromCursor(x: number, y: number, hexWidth: number, hexRadius: number): [number, number] {
    const hexHeight_1_5 = 3 * hexRadius;
    const y_3radius_count = Math.floor(y / hexHeight_1_5);
    const yMin = y_3radius_count * hexHeight_1_5;

    const x_elCount = Math.floor(x / hexWidth);
    const xMin = x_elCount * hexWidth;

    let mapX = x_elCount;
    let mapY = y_3radius_count * 2;

    // |/ or /\ or /|
    // radius /2
    if (y < yMin + hexRadius / 2) {
        // (mapX - 1, mapY - 1) or (mapX, mapY) or (mapX + 1, mapY -1)
        return [-1, mapY];
    }

    //  / \
    // radius / 2
    // |||||
    // radius * 1.5
    //  \ /
    if (y <= yMin + hexRadius * 1.5) {
        // (mapX, mapY)
        return [mapX, mapY];
    }

    // radius * 1.5
    // |\ or \/ or /|
    // radius * 2
    if (y <  yMin + hexRadius * 2) {
        // (mapX - 1, mapY + 1) or (mapX, mapY) or (mapX + 1, mapY + 1)
        return [-1, mapY];
    }

    // |\      /|
    // radius * 2
    // ||| or |||
    // radius * 3
    // |/      \|
    // (mapX - 1, mapY + 1) or (mapX, mapY + 1)
    if (x < xMin + hexWidth / 2) mapX -= 1;
    return [mapX, mapY + 1];
}
