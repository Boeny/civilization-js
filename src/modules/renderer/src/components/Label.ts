import { BaseElement, Content } from "../models"
import { IAttrs } from "../types"
import { Text } from "./Text"

export function Label(label: string, content?: Content, params?: IAttrs) {
    let labelContent: Content = Text(label)

    if (content) {
        if (content instanceof Array) {
            labelContent = [labelContent, ...content]
        } else {
            labelContent = [labelContent, content]
        }
    }

    return new BaseElement('label', labelContent, params)
}