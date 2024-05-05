import './ImageMap.css'
import { LAYER_CONFIG, LAYER_TYPE } from 'const'
import { IMAGE_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from "screens/EditorScreen/const"
import { trigger, uploadFile } from 'utils'
import { getImageMapData, setImageMapData } from 'state/imageMapDataActions'
import { observable } from "hoc/observable"
import { showOnLayer } from 'hoc/showOnLayer'

import { Canvas } from "components/base/Canvas"
import { Button } from "components/base/Button/Button"
import { Div } from "components/base/Div"

function LoadImageButton({onClick}: {onClick: () => void}) {
    return Button('Load Image', {onClick})
}

const LoadImageButtonContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.image, LoadImageButton)


interface Params extends ContainerParams {
    image: CanvasImageSource | null
    onLoadButtonClick: () => void
}

function ImageMap({width, height, image, onLoadButtonClick}: Params) {
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
            LoadImageButtonContainer({onClick: onLoadButtonClick}),
            {id: 'image-map', style: {height: 'calc(100% - 32px)'}}
        )
}

interface ContainerParams {
    width: number
    height: number
}

export const ImageMapContainer = observable(IMAGE_MAP_UPDATE_EVENT, (params: ContainerParams) =>
    ImageMap({
        ...params,
        image: getImageMapData(),
        onLoadButtonClick: async () => {
            const data = await uploadFile()

            if (data) {
                setImageMapData(data)
                trigger(IMAGE_MAP_UPDATE_EVENT)
            }
        }
    })
)
