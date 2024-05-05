import './MapParamsBlock.css'
import { Div } from 'components/base/Div'
import { Block } from "components/Block/Block"
import { Label } from "components/base/Label"
import { getNumberInput } from './NumberInput'

export {getState, setDefaultStateAction, updateFields} from './state'

const WidthNumberInput = getNumberInput('width')
const HeightNumberInput = getNumberInput('height')
const HexWidthNumberInput = getNumberInput('hexWidth')

interface Params {
    onEnterKeyDown: () => void
}

export function MapParamsBlock({onEnterKeyDown}: Params) {
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
