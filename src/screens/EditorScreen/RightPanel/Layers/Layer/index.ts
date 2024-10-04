import './Layer.css'
import { Div, getClasses } from 'modules/renderer'
import { observerAttrs, trigger } from 'modules/observer'
import { LAYER_TYPE } from 'screens/EditorScreen/types'
import { LAYER_CHANGE_EVENT, LAYER_CONFIG } from 'screens/EditorScreen/const'
import { editorScreenStore } from 'screens/EditorScreen/store'
import { MiniMap } from './MiniMap'
import { Title } from './Title'

interface IParams extends IClickParams {
    type: LAYER_TYPE
    title: string
    onClick: () => void
}
function Layer({type, width, title, onClick}: IParams) {
    return Div(
        [
            Title({title}),
            MiniMap({type, width, title}),
        ],
        {onClick}
    )
}


function getLayerEvent(type: LAYER_TYPE) {
    return 'layer-' + type
}

interface IClickParams {
    width: number
}
export const LayersClickHandlerObserver = Object.keys(LAYER_CONFIG).map((key) => {
    const {layer, isPainting} = editorScreenStore
    const type = parseInt(key) as LAYER_TYPE

    return observerAttrs(
        getLayerEvent(type),
        ({width}: {width: number}) => Layer({
            type,
            width,
            title: LAYER_CONFIG[type].title,
            onClick: () => {
                if (layer.value === type) return

                isPainting.value = false

                // some layer is always selected
                const prev = layer.value
                layer.value = type

                trigger(getLayerEvent(type))
                trigger(getLayerEvent(prev))
                trigger(LAYER_CHANGE_EVENT)
            }
        }),
        [{
            name: 'className',
            value: () => getClasses(['layer', layer.value === type ? 'selected' : undefined]),
        }]
    )
})
