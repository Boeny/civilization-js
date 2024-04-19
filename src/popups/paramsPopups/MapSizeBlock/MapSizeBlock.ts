import './MapSizeBlock.css';
import { Block } from "components/Block/Block";
import { Input, Params } from "components/Input";
import { Label } from "components/Label";
import { convertToInteger, isValueNonNegativeNumber, isValueNumber, isValuePositiveNumber, isValueSmallNumber } from 'utils';

const DEFAULT_VALUE = 1;

function checkValidity(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value);
}

function checkSubmitValidity(value: number): boolean {
    return isValuePositiveNumber(value);
}

const INPUT_PROPS: Params<number> = {
    defaultValue: String(DEFAULT_VALUE),
    className: 'number-input',
    checkValidity,
    checkSubmitValidity,
    getValue: convertToInteger,
    setSubmitError: (el) => el.style.outline = '2px solid #ff4d4d',
    removeSubmitError: (el) => el.style.outline = 'none',
};

export function MapSizeBlock() {
    return Block(
        [
            Label('Width', Input('width', INPUT_PROPS)),
            Label('Height', Input('height', INPUT_PROPS)),
        ],
        {bordered: true}
    )
}
