import { Canvas } from "components/base/Canvas";
import { observable } from "hoc/observable";
import { IMAGE_MAP_UPDATE_EVENT } from "screens/EditorScreen/const";
import { editorScreenStore } from "screens/EditorScreen/store";

interface Params extends ObservableParams {
    image: CanvasImageSource
}
function ImageMiniMap({image, width, title}: Params) {
    return Canvas(
        (ctx) => {ctx.drawImage(image, 0, 0, width - 29, width > 170 ? 170 : width)},
        {
            title,
            width: width - 29,
            height: width > 170 ? 170 : width,
        }
    )
}


interface ObservableParams {
    width: number
    title: string
}
export const ImageMiniMapToggleObservable = observable(IMAGE_MAP_UPDATE_EVENT, ({width, title}: ObservableParams) => {
    const {imageMapData} = editorScreenStore

    return imageMapData.value ? ImageMiniMap({image: imageMapData.value, width, title}) : null
})
