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

export function getZoomFor(targetSize: number, currentSize: number): number {
    return targetSize / currentSize;
}
