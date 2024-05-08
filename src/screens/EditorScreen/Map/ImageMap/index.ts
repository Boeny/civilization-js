import './ImageMap.css'
import { IMAGE_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT, LAYER_CONFIG } from "screens/EditorScreen/const"
import { uploadFile } from 'utils'
import { editorScreenStore } from 'screens/EditorScreen/store'
import { observable } from "hoc/observable"
import { showOnLayer } from 'hoc/showOnLayer'
import { Canvas } from "components/base/Canvas"
import { Button } from "components/base/Button"
import { Div } from "components/base/Div"
import { trigger } from 'utils/components'
import { LAYER_TYPE } from 'screens/EditorScreen/types'

function LoadImageButton() {
    return Button('Load Image', {onClick: async () => {
        const data = await uploadFile()

        if (data) {
            editorScreenStore.imageMapData.value = data
            trigger(IMAGE_MAP_UPDATE_EVENT)
        }
    }})
}

const LoadImageButtonToggleObservable = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.image, LoadImageButton)


interface Params extends ObservableParams {
    image: CanvasImageSource | null
}
function ImageMap({width, height, image}: Params) {
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
            LoadImageButtonToggleObservable(),
            {id: 'image-map', style: {height: 'calc(100% - 32px)'}}
        )
}

interface ObservableParams {
    width: number
    height: number
}
export const ImageMapToggleObservable = observable(IMAGE_MAP_UPDATE_EVENT, (params: ObservableParams) => {
    const {imageMapData} = editorScreenStore
    if (!imageMapData.value) return null

    return ImageMap({
        ...params,
        image: imageMapData.value,
    })
})
