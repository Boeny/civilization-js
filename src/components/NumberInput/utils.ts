import { isValueNonNegativeNumber, isValueNumber, isValueSmallNumber } from 'utils';

export function convertToInteger(value: string): number {
    return value.includes('.') ? NaN : Number(value);
}

/**
 * checks if value is a number and it's in range
 * @param value number or NaN
 * @returns boolean
 */
export function isValid(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value);
}
