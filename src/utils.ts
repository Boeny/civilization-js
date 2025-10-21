import { IPoint } from 'types';

export function getClasses(classes: (string | boolean | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
}

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

export function getVector(x: number, y: number): IPoint {
    return { x, y };
}

export function vectorSum(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return getVector(a.x + b, a.y + b);
    }

    return getVector(a.x + b.x, a.y + b.y);
}

export function vectorSub(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return getVector(a.x - b, a.y - b);
    }

    return getVector(a.x - b.x, a.y - b.y);
}

export function vectorDiv(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return getVector(a.x / b, a.y / b);
    }

    return getVector(a.x / b.x, a.y / b.y);
}

export function vectorMult(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return getVector(a.x * b, a.y * b);
    }

    return getVector(a.x * b.x, a.y * b.y);
}

export function getZeroVector(): IPoint {
    return getVector(0, 0);
}

export function vectorLength(v: IPoint): number {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function vectorEquals(v1: IPoint, v2: IPoint): boolean {
    return v1.x === v2.x && v1.y === v2.y;
}

export function getZoomFor(targetSize: number, currentSize: number): number {
    return targetSize / currentSize;
}

/**
 * start < end, step > 0
 * @param start number
 * @param end number
 * @param step number
 * @returns number[]
 */
export function getNumbersBetween(start: number, end: number, step: number): number[] {
    if (step <= 0) {
        throw Error('step must be > 0');
    }
    if (start >= end) {
        throw Error('start must be < end');
    }

    const result: number[] = [];
    let i = 1;
    let current = start + i * step;

    while (current < end) {
        result.push(Number(current.toFixed(10)));
        i += 1;
        current = start + i * step;
    }

    return result;
}

export function getPointsFromLine(start: IPoint, end: IPoint, minDistance: number): IPoint[] {
    if (vectorLength(vectorSub(end, start)) < minDistance) {
        return [];
    }

    let step = minDistance;

    // k = 0, y = b
    if (Math.abs(start.y - end.y) < minDistance) {
        if (start.x <= end.x) {
            return getNumbersBetween(start.x, end.x, step).map((x) => ({ x, y: end.y }));
        }

        return getNumbersBetween(end.x, start.x, step).map((x) => ({ x, y: start.y }));
    }

    // x = b
    if (Math.abs(start.x - end.x) < minDistance) {
        if (start.y <= end.y) {
            return getNumbersBetween(start.y, end.y, step).map((y) => ({ y, x: end.x }));
        }

        return getNumbersBetween(end.y, start.y, step).map((y) => ({ y, x: start.x }));
    }

    // y = xk + b
    // start.y = start.x * k + b
    // b = start.y - start.x * k = end.y - end.x * k
    // k = (start.y - end.y) / (start.x - end.x) = tg(angle)
    const k = (start.y - end.y) / (start.x - end.x);
    const b = start.y - start.x * k;
    const angle = Math.atan(k);

    // tg(45) = 1
    // y/x <= 1
    // y <= x
    if (k <= 1) {
        step *= Math.cos(angle);

        if (start.x <= end.x) {
            return getNumbersBetween(start.x, end.x, step).map((x) => ({ x, y: k * x + b }));
        }

        return getNumbersBetween(end.x, start.x, step).map((x) => ({ x, y: k * x + b }));
    }

    // y > x
    step *= Math.sin(angle);

    if (start.y <= end.y) {
        return getNumbersBetween(start.y, end.y, step).map((y) => ({ y, x: (y - b) / k }));
    }

    return getNumbersBetween(end.y, start.y, step).map((y) => ({ y, x: (y - b) / k }));
}
