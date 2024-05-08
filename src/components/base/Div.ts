import { Attrs, Content } from "types/components"
import { getBaseComponent } from "utils/components"

export interface Params extends Attrs {
}
export function Div(content?: Content, params?: Params) {
    return getBaseComponent(document.createElement('div'), content, params)
}
