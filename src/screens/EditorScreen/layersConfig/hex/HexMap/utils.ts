import { SQRT_3 } from 'screens/EditorScreen/const';
import { IPoint } from 'types';
import { getVector, vectorSum } from 'utils';

function yIsBelowTheLine(isIncreasing: boolean, x: number, y: number, dy: number): boolean {
    // tan(30) = 1 / sqrt(3)
    const yOnTheLine = isIncreasing ? x / SQRT_3 : dy - x / SQRT_3;

    return y < yOnTheLine;
}

export function getMapCoordinatesFromCursor({ x, y }: IPoint, hexWidth: number, hexRadius: number): IPoint {
    const hexHeight_1_5 = 3 * hexRadius;
    const y_3radius_count = Math.floor(y / hexHeight_1_5);
    let yMin = y_3radius_count * hexHeight_1_5;

    const x_widthCount = Math.floor(x / hexWidth);
    const xMin = x_widthCount * hexWidth;

    const result = getVector(x_widthCount, y_3radius_count * 2);

    const halfRadius = hexRadius / 2;
    const halfWidth = hexWidth / 2;
    const xCenter = xMin + halfWidth;

    // yMin
    // |/ or /\ or \|
    // yMin + radius / 2
    if (y < yMin + halfRadius) {
        // (mapX - 1, mapY - 1) or (mapX, mapY) or (mapX, mapY -1)
        if (x < xCenter) {
            return yIsBelowTheLine(false, x - xMin, y - yMin, halfRadius) ? vectorSum(result, -1) : result;
        }

        return yIsBelowTheLine(true, x - xCenter, y - yMin, halfRadius) ? vectorSum(result, getVector(0, -1)) : result;
    }

    const radius_1_5 = hexRadius * 1.5;

    // yMin
    //  / \
    // yMin + radius / 2
    // |||||
    // yMin + radius * 1.5
    //  \ /
    if (y <= yMin + radius_1_5) {
        return result;
    }

    // yMin + radius * 1.5
    // |\ or \/ or /|
    // yMin + radius * 2
    if (y < yMin + hexRadius * 2) {
        yMin += radius_1_5;

        // (mapX - 1, mapY + 1) or (mapX, mapY) or (mapX, mapY + 1)
        if (x < xCenter) {
            return yIsBelowTheLine(true, x - xMin, y - yMin, halfRadius) ? result : vectorSum(result, getVector(-1, 1));
        }

        return yIsBelowTheLine(false, x - xCenter, y - yMin, halfRadius) ? result : vectorSum(result, getVector(0, 1));
    }

    // yMin + radius * 1.5
    // |\      /|
    // yMin + radius * 2
    // ||| or |||
    // yMin + radius * 3
    // |/      \|
    // (mapX - 1, mapY + 1) or (mapX, mapY + 1)
    if (x < xCenter) {
        result.x -= 1;
    }

    return vectorSum(result, getVector(0, 1));
}
