import './NumberInput.css'
import { checkValidity, convertToInteger } from "../utils"
import { getErrorValue, getEvent, getValue, setValue } from "../store"
import { observableAttrs } from "hoc/observable"
import { Input, Params as InputParams } from "components/base/Input"
import { HexMapField } from 'screens/EditorScreen/types'
import { KEY_CODE } from 'types'
import { getClasses, trigger } from 'utils/components'

type Params = Omit<InputParams, 'className' | 'value' | 'onChange'> & {
    onEnterKeyDown: () => void
}
export const getNumberInput = (field: HexMapField) => {
    const event = getEvent(field)

    return observableAttrs(
        event,
        ({onEnterKeyDown, ...params}: Params) => {
            return Input({
                ...params,
                onChange: (value, key) => {
                    if (key === KEY_CODE.enter) {
                        onEnterKeyDown()
                        return
                    }

                    const num = convertToInteger(value)

                    if (checkValidity(num)) {
                        setValue(field, num)
                    } else {
                        trigger(event)
                    }
                },
            })
        },
        [
            {name: 'className', value: () => getClasses(['number-input', getErrorValue(field) ? 'error' : undefined])},
            {name: 'value', value: () => String(getValue(field) || '')},
        ]
    )
}
