import { LAYER_TYPE } from "const"
import { HexMiniMapContainer } from "./HexMiniMap/HexMiniMap"
import { ImageMiniMapContainer } from "./ImageMiniMap"

interface Params {
    type: LAYER_TYPE
    width: number
    title: string
}

export function MiniMap({type, width, title}: Params) {
    switch (type) {
        case LAYER_TYPE.image: return ImageMiniMapContainer({width, title})
        case LAYER_TYPE.hex: return HexMiniMapContainer({width, title})
        default: return null
    }
}
