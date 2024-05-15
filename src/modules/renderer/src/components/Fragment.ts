import { FragmentElement } from "../models"

export function Fragment(content: FragmentElement['content']) {
    return new FragmentElement(content)
}
