import { Component } from "types"
import { LAYER_TYPE } from "const"
import { getLayer } from "state/layerActions"
import { observable } from "./observable"

export const showOnLayer = <T>(event: string, layer: LAYER_TYPE, component: (params: T) => Component) => {
    return observable<T>(event, (params) =>
        getLayer() === layer ? component(params) : null
    )
}
