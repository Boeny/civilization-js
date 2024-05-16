import './HexMapParamsBlock.css'
import { Block } from "components/Block"
import { getNumberInput } from './NumberInput'
import { Div, Label } from 'modules/renderer'

const WidthNumberInput = getNumberInput('width')
const HeightNumberInput = getNumberInput('height')
const HexWidthNumberInput = getNumberInput('hexWidth')

interface IParams {
    onEnterKeyDown: () => void
}
export function HexMapParamsBlock({onEnterKeyDown}: IParams) {
    return Block(
        [
            Div([
                Label('Width', WidthNumberInput({autoFocus: true, onEnterKeyDown})),
                Label('Height', HeightNumberInput({onEnterKeyDown})),
            ]),
            Label('Hex width', HexWidthNumberInput({onEnterKeyDown})),
        ],
        {bordered: true}
    )
}
