import { LAYER_TYPE } from "screens/EditorScreen/types"
import { HexMiniMapToggleObserver } from "./HexMiniMap"
import { ImageMiniMapToggleObserver } from "./ImageMiniMap"

interface IParams {
    type: LAYER_TYPE
    width: number
    title: string
}
export function MiniMap({type, width, title}: IParams) {
    switch (type) {
        case LAYER_TYPE.image: return ImageMiniMapToggleObserver({width, title})
        case LAYER_TYPE.hex: return HexMiniMapToggleObserver({width: width - 29, title})
        default: return null
    }
}
