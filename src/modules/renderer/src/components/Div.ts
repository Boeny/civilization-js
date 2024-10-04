import { BaseElement } from "../models"
import { IAttrs } from "../types"

export function Div(content?: BaseElement['content'], params?: IAttrs) {
    return new BaseElement('div', content, params)
}
