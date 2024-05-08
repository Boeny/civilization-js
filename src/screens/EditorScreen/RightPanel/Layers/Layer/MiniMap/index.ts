import { LAYER_TYPE } from "screens/EditorScreen/types"
import { HexMiniMapToggleObservable } from "./HexMiniMap"
import { ImageMiniMapToggleObservable } from "./ImageMiniMap"

interface Params {
    type: LAYER_TYPE
    width: number
    title: string
}
export function MiniMap({type, width, title}: Params) {
    switch (type) {
        case LAYER_TYPE.image: return ImageMiniMapToggleObservable({width, title})
        case LAYER_TYPE.hex: return HexMiniMapToggleObservable({width: width - 29, title})
        default: return null
    }
}
