import { Canvas } from "modules/renderer"
import { observer } from "modules/observer"
import { IMAGE_MAP_UPDATE_EVENT } from "screens/EditorScreen/const"
import { editorScreenStore } from "screens/EditorScreen/store"

interface IParams extends IToggleParams {
    image: CanvasImageSource
}
function ImageMiniMap({image, width, title}: IParams) {
    return Canvas(
        (ctx) => {ctx.drawImage(image, 0, 0, width - 29, width > 170 ? 170 : width)},
        {
            title,
            width: width - 29,
            height: width > 170 ? 170 : width,
        }
    )
}


interface IToggleParams {
    width: number
    title: string
}
export const ImageMiniMapToggleObserver = observer(IMAGE_MAP_UPDATE_EVENT, ({width, title}: IToggleParams) => {
    const {imageMapData} = editorScreenStore

    return imageMapData.value ? ImageMiniMap({image: imageMapData.value, width, title}) : null
})
