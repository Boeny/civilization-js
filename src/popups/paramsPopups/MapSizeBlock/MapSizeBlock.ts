import { Div } from 'components/Div';
import './MapSizeBlock.css';
import { Block } from "components/Block/Block";
import { Input, Params } from "components/Input";
import { Label } from "components/Label";
import { convertToInteger, isValueNonNegativeNumber, isValueNumber, isValuePositiveNumber, isValueSmallNumber } from 'utils';

const DEFAULT_MAP_SIZE_VALUE = 100;
const DEFAULT_HEX_SIZE_VALUE = 100;

function checkValidity(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value);
}

function checkSubmitValidity(value: number): boolean {
    return isValuePositiveNumber(value);
}

const MAP_SIZE_INPUT_PROPS: Params<number> = {
    defaultValue: String(DEFAULT_MAP_SIZE_VALUE),
    className: 'number-input',
    checkValidity,
    checkSubmitValidity,
    getValue: convertToInteger,
    setSubmitError: (el) => el.style.outline = '2px solid #ff4d4d',
    removeSubmitError: (el) => el.style.outline = 'none',
};
const HEX_SIZE_INPUT_PROPS: Params<number> = {...MAP_SIZE_INPUT_PROPS, defaultValue: String(DEFAULT_HEX_SIZE_VALUE)};

export function MapSizeBlock() {
    return Block(
        [
            Div([
                Label('Width', Input('width', MAP_SIZE_INPUT_PROPS)),
                Label('Height', Input('height', MAP_SIZE_INPUT_PROPS)),
            ]),
            Label('Hex size', Input('hexSize', HEX_SIZE_INPUT_PROPS)),
        ],
        {bordered: true}
    )
}
