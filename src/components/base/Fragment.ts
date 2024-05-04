import { Component } from "types"
import { getFragmentComponent } from "utils"

export function Fragment(content: Component[]) {
    return getFragmentComponent(content)
}
