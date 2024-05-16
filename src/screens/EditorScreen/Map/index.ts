import { Fragment } from "modules/renderer"
import { HexMapLayerChangeObserver } from "./HexMap"
import { ImageMapToggleObserver } from "./ImageMap"

interface IParams {
    width: number
    height: number
}
export function Map({width, height}: IParams) {
    return Fragment([
        ImageMapToggleObserver({width, height}),
        HexMapLayerChangeObserver({width, height}),
    ])
}
