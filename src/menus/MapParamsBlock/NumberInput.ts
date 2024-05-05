import './NumberInput.css'
import { KEY_CODE } from 'const'
import { convertToInteger, getClasses, trigger } from "utils"
import { checkValidity } from "./logic"
import { State, getErrorValue, getEvent, getValue, setValue } from "./state"
import { observableAttrs } from "hoc/observable"
import { Input, Params as InputParams } from "components/base/Input"

type Params = Omit<InputParams, 'className' | 'value' | 'onChange'> & {
    onEnterKeyDown: () => void
}

export const getNumberInput = (field: keyof State) => {
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
