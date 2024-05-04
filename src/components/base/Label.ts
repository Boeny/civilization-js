import { Attrs, Content } from "types"
import { getBaseComponent, insertContent } from "utils"

export interface Params extends Attrs {
}

export function Label(label: string, content?: Content, params?: Params) {
    const element = document.createElement('label')
    insertContent(element, label)

    return getBaseComponent(element, content, params)
}
