import './NumberInput.css'
import { checkValidity, convertToInteger } from "../utils"
import { getErrorValue, getEvent, getValue, setValue } from "../store"
import { HexMapField } from 'screens/EditorScreen/types'
import { KEY_CODE } from 'types'
import { IInputParams, Input, getClasses } from 'modules/renderer'
import { observerAttrs, trigger } from 'modules/observer'

type IParams = Omit<IInputParams, 'className' | 'value' | 'onChange'> & {
    onEnterKeyDown: () => void
}
export const getNumberInput = (field: HexMapField) => {
    const event = getEvent(field)

    return observerAttrs(
        event,
        ({onEnterKeyDown, ...params}: IParams) => {
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
