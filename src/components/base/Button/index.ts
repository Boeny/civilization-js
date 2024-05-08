import './Button.css'
import { Attrs, Content } from "types/components"
import { getClasses, getBaseComponent } from "utils/components"

export interface Params extends Attrs {
}
export function Button(content: Content, params: Params) {
    params.className = getClasses(['button', params.className])

    return getBaseComponent(document.createElement('button'), content, params)
}
