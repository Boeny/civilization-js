/* eslint-disable camelcase */
import { SQRT_2, SQRT_3 } from 'const';
import { getHexRadius } from 'hexUtils';
import { IPoint } from 'types';
import { getNumbersBetween, getVector, vectorLength, vectorSub, vectorSum } from 'utils';

function yIsBelowTheLine(isIncreasing: boolean, x: number, y: number, dy: number): boolean {
    // tan(30) = 1 / sqrt(3)
    const yOnTheLine = isIncreasing ? x / SQRT_3 : dy - x / SQRT_3;

    return y < yOnTheLine;
}

export function getMapCoordinatesFromCursor({ x, y }: IPoint, hexWidth: number): IPoint {
    const hexRadius = getHexRadius(hexWidth);
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

export function getMapCellsFromLine(
    start: IPoint,
    end: IPoint,
    params: { hexWidth: number; includeStart: boolean; includeEnd: boolean },
): IPoint[] {
    const points: IPoint[] = [];

    if (params.includeStart) {
        points.push(start);
    }
    if (params.includeEnd) {
        points.push(end);
    }

    const hexRadius = getHexRadius(params.hexWidth);
    let additionalPoints: IPoint[] = [];

    if (vectorLength(vectorSub(end, start)) > hexRadius) {
        // y = xk + b
        // start.y = start.x * k + b
        // b = start.y - start.x * k = end.y - end.x * k
        // k = (start.y - end.y) / (start.x - end.x)
        let k = 0;

        if (Math.abs(start.y - end.y) < 1) {
            // y = b
            if (start.x < end.x) {
                additionalPoints = getNumbersBetween(start.x, end.x, hexRadius).map((x) => ({ x, y: end.y }));
            } else {
                additionalPoints = getNumbersBetween(end.x, start.x, hexRadius).map((x) => ({ x, y: start.y }));
            }
        } else if (Math.abs(start.x - end.x) < 1) {
            if (start.y < end.y) {
                additionalPoints = getNumbersBetween(start.y, end.y, hexRadius).map((y) => ({ y, x: end.x }));
            } else {
                additionalPoints = getNumbersBetween(end.y, start.y, hexRadius).map((y) => ({ y, x: start.x }));
            }
        } else {
            k = (start.y - end.y) / (start.x - end.x);
            const b = start.y - start.x * k;

            // cos 45 = sqrt(2)
            const step = hexRadius / SQRT_2;

            // tan(45) = 1
            if (k <= 1) {
                if (start.x < end.x) {
                    additionalPoints = getNumbersBetween(start.x, end.x, step).map((x) => ({ x, y: k * x + b }));
                } else {
                    additionalPoints = getNumbersBetween(end.x, start.x, step).map((x) => ({ x, y: k * x + b }));
                }
            } else {
                if (start.y < end.y) {
                    additionalPoints = getNumbersBetween(start.y, end.y, step).map((y) => ({ y, x: (y - b) / k }));
                } else {
                    additionalPoints = getNumbersBetween(end.y, start.y, step).map((y) => ({ y, x: (y - b) / k }));
                }
            }
        }
    }

    return [...points, ...additionalPoints].map((point) => getMapCoordinatesFromCursor(point, params.hexWidth));
}
