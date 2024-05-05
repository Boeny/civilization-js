import { Canvas } from "components/base/Canvas";
import { observable } from "hoc/observable";
import { IMAGE_MAP_UPDATE_EVENT } from "screens/EditorScreen/const";
import { getImageMapData } from "state/imageMapDataActions";

interface Params {
    width: number
    title: string
}

export const ImageMiniMapContainer = observable(IMAGE_MAP_UPDATE_EVENT, ({width, title}: Params) => {
    const image = getImageMapData()

    if (!image) return null

    return Canvas(
        (ctx) => {ctx.drawImage(image, 0, 0, width - 29, width > 170 ? 170 : width)},
        {
            title,
            width: width - 29,
            height: width > 170 ? 170 : width,
        }
    )
})
