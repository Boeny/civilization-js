import { Component } from "types/components"
import { getFragmentComponent } from "utils/components"

export function Fragment(content: Component[]) {
    return getFragmentComponent(content)
}
