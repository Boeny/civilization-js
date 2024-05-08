import { Attrs } from "types/components"
import { getBaseComponent } from "utils/components"

export interface Params extends Attrs {
}
export function Img(src: string, params?: Params) {
    const element = document.createElement('img')
    element.src = src

    return getBaseComponent(element, null, params)
}
