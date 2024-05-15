import { BaseElement } from "../models"
import { IAttrs } from "../types"

export function Img(src: string, params?: IAttrs) {
    return new BaseElement('img', null, {...params, src})
}
