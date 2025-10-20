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

export function getZoomFor(targetSize: number, currentSize: number): number {
    return targetSize / currentSize;
}

/**
 * start < end!!!
 * @param start number
 * @param end number
 * @param step number
 * @returns number[]
 */
export function getNumbersBetween(start: number, end: number, step: number): number[] {
    const result: number[] = [];
    let a = start + step;

    while (a < end) {
        result.push(a);
        a += step;
    }

    return result;
}
