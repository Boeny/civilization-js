import './Button.css'
import { Attrs, Content } from "types"
import { getClasses, getBaseComponent } from "utils"

export interface Params extends Attrs {
}

export function Button(content: Content, params: Params) {
    params.className = getClasses(['button', params.className])

    return getBaseComponent(document.createElement('button'), content, params)
}
