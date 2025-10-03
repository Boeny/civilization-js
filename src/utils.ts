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

export function vectorSum(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return {
            x: a.x + b,
            y: a.y + b,
        };
    }

    return {
        x: a.x + b.x,
        y: a.y + b.y,
    };
}

export function vectorSub(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return {
            x: a.x - b,
            y: a.y - b,
        };
    }

    return {
        x: a.x - b.x,
        y: a.y - b.y,
    };
}

export function vectorDiv(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return {
            x: a.x / b,
            y: a.y / b,
        };
    }

    return {
        x: a.x / b.x,
        y: a.y / b.y,
    };
}

export function vectorMult(a: IPoint, b: IPoint | number): IPoint {
    if (typeof b === 'number') {
        return {
            x: a.x * b,
            y: a.y * b,
        };
    }

    return {
        x: a.x * b.x,
        y: a.y * b.y,
    };
}

export function getZeroVector(): IPoint {
    return { x: 0, y: 0 };
}
