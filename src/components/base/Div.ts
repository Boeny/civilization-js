import { Attrs, Content } from "types"
import { getBaseComponent } from "utils"

export interface Params extends Attrs {
}

export function Div(content?: Content, params?: Params) {
    return getBaseComponent(document.createElement('div'), content, params)
}
