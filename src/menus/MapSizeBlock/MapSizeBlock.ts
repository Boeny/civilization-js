import './MapSizeBlock.css'
import { convertToInteger } from 'utils'
import { isValueNonNegativeNumber, isValueNumber, isValuePositiveNumber, isValueSmallNumber } from 'logic'
import { Div } from 'components/base/Div'
import { Block } from "components/Block/Block"
import { Input, Params as InputParams } from "components/base/Input"
import { Label } from "components/base/Label"

const DEFAULT_MAP_SIZE_VALUE = 100
const DEFAULT_HEX_SIZE_VALUE = 100

function checkValidity(value: number): boolean {
    // 0 is necessary for deleting numbers, but you still can't submit it
    return isValueNumber(value) && isValueNonNegativeNumber(value) && isValueSmallNumber(value)
}

function checkSubmitValidity(value: number): boolean {
    return isValuePositiveNumber(value)
}

const MAP_SIZE_INPUT_PROPS: InputParams<number> = {
    defaultValue: String(DEFAULT_MAP_SIZE_VALUE),
    className: 'number-input',
    checkValidity,
    checkSubmitValidity,
    getValue: convertToInteger,
    setSubmitError: (el) => el.style.outline = '2px solid #ff4d4d',
    removeSubmitError: (el) => el.style.outline = 'none',
}

const HEX_SIZE_INPUT_PROPS: InputParams<number> = {...MAP_SIZE_INPUT_PROPS, defaultValue: String(DEFAULT_HEX_SIZE_VALUE)}

interface Params {
    autoFocus?: boolean
    onEnterKeyDown?: () => void
}

export function MapSizeBlock(params?: Params) {
    const {onEnterKeyDown, autoFocus} = params || {}

    return Block(
        [
            Div([
                Label('Width', Input('width', {...MAP_SIZE_INPUT_PROPS, autoFocus, onEnterKeyDown})),
                Label('Height', Input('height', {...MAP_SIZE_INPUT_PROPS, onEnterKeyDown})),
            ]),
            Label('Hex width', Input('hexWidth', {...HEX_SIZE_INPUT_PROPS, onEnterKeyDown})),
        ],
        {bordered: true}
    )
}
