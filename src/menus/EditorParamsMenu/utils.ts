import { HexMapField, IHexMapParams } from 'screens/EditorScreen/types';

function isValuePositiveNumber(value: number): boolean {
    return value > 0;
}

function isValueNumber(value: number): boolean {
    return !isNaN(value);
}

function isValueNonNegativeNumber(value: number): boolean {
    return value >= 0;
}

function isValueSmallNumber(value: number): boolean {
    return value <= 99999;
}

/**
 * checks if value a number in diapazone
 * @param value number or NaN
 * @returns boolean
 */
export function checkValidity(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value);
}

export function checkSubmitValidityForField(value: number): boolean {
    return isValuePositiveNumber(value);
}

export function checkSubmitValidity(data: IHexMapParams): HexMapField[] {
    const errorFields: HexMapField[] = [];

    (Object.keys(data) as HexMapField[]).forEach((field) => {
        if (!checkSubmitValidityForField(data[field])) {
            errorFields.push(field);
        }
    });

    return errorFields;
}

export function convertToInteger(value: string): number {
    return value.includes('.') ? NaN : Number(value);
}
