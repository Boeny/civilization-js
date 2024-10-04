import { BaseElement } from "../models"
import { IAttrs } from "../types"

export function Span(content?: BaseElement['content'], params?: IAttrs) {
    return new BaseElement('span', content, params)
}
