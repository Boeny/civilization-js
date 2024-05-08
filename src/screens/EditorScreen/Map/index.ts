import { Fragment } from "components/base/Fragment"
import { HexMapLayerChangeObservable } from "./HexMap"
import { ImageMapToggleObservable } from "./ImageMap"

interface Params {
    width: number
    height: number
}
export function Map({width, height}: Params) {
    return Fragment([
        ImageMapToggleObservable({width, height}),
        HexMapLayerChangeObservable({width, height}),
    ])
}
