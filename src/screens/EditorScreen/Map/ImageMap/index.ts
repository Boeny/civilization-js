import './ImageMap.css'
import { Canvas, Div } from 'modules/renderer'
import { observer } from 'modules/observer'
import { LAYER_TYPE } from 'screens/EditorScreen/types'
import { IMAGE_MAP_UPDATE_EVENT, LAYER_CONFIG } from "screens/EditorScreen/const"
import { editorScreenStore } from 'screens/EditorScreen/store'
import { LoadImageButtonToggleObserver } from './LoadImageButton'

interface IParams extends IToggleParams {
    image: CanvasImageSource | null
}
function ImageMap({width, height, image}: IParams) {
    return image ?
        Canvas(
            (ctx) => {ctx.drawImage(image, 0, 0)},
            {
                id: 'image-map',
                width,
                height,
                style: {zIndex: LAYER_CONFIG[LAYER_TYPE.image].zIndex},
            }
        )
    :
        Div(
            LoadImageButtonToggleObserver(),
            {id: 'image-map', style: {height: 'calc(100% - 32px)'}}
        )
}

interface IToggleParams {
    width: number
    height: number
}
export const ImageMapToggleObserver = observer(IMAGE_MAP_UPDATE_EVENT, (params: IToggleParams) => {
    const {imageMapData} = editorScreenStore
    if (!imageMapData.value) return null

    return ImageMap({
        ...params,
        image: imageMapData.value,
    })
})
