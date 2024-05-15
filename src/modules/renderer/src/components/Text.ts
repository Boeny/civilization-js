import {TextElement} from '../models'

export function Text(content: TextElement['content']) {
    return new TextElement(content)
}
