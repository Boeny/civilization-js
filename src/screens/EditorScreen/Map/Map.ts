import { Fragment } from "components/base/Fragment"
import { HexMapLayerChangeContainer } from "./HexMap/HexMap"
import { ImageMapContainer } from "./ImageMap/ImageMap"

interface Params {
    width: number
    height: number
}

export function Map({width, height}: Params) {
    return Fragment([
        ImageMapContainer({width, height}),
        HexMapLayerChangeContainer({width, height}),
    ])
}
