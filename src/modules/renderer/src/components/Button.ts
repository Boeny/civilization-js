import { BaseElement } from "../models"
import { IAttrs } from "../types"

export function Button(content: BaseElement['content'], params: IAttrs) {
    return new BaseElement('button', content, params)
}
