import { Attrs } from "types"
import { getBaseComponent } from "utils"

export interface Params extends Attrs {
    onChange: (value: string, key: string) => void
}

export function Input({onChange, ...params}: Params) {
    const element = document.createElement('input')

    return getBaseComponent(
        element,
        null,
        {...params, onKeyUp: (e) => onChange(element.value, e.key)}
    )
}
