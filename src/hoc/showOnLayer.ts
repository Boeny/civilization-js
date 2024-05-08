import { LAYER_TYPE } from "screens/EditorScreen/types"
import { observable } from "./observable"
import { editorScreenStore } from "screens/EditorScreen/store"
import { Component } from "types/components"

export const showOnLayer = <T>(event: string, layer: LAYER_TYPE, component: (params: T) => Component) => {
    return observable<T>(event, (params) =>
        editorScreenStore.layer.value === layer ? component(params) : null
    )
}
