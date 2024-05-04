import { Attrs } from "types"
import { getBaseComponent } from "utils"

export interface Params extends Attrs {
}

export function Img(src: string, params?: Params) {
    const element = document.createElement('img')
    element.src = src

    return getBaseComponent(element, null, params)
}
