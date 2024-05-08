import './Layer.css'
import { LAYER_CHANGE_EVENT, LAYER_CONFIG } from 'screens/EditorScreen/const'
import { editorScreenStore } from 'screens/EditorScreen/store'
import { observableAttrs } from 'hoc/observable'
import { Div } from "components/base/Div"
import { MiniMap } from './MiniMap'
import { Title } from './Title'
import { LAYER_TYPE } from 'screens/EditorScreen/types'
import { getClasses, trigger } from 'utils/components'

interface Params extends ObservableParams {
    type: LAYER_TYPE
    title: string
    onClick: () => void
}
function Layer({type, width, title, onClick}: Params) {
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

interface ObservableParams {
    width: number
}
export const LayersClickHandlerObservableAttrs = Object.keys(LAYER_CONFIG).map((key) => {
    const {layer, isPainting} = editorScreenStore
    const type = parseInt(key) as LAYER_TYPE

    return observableAttrs<{width: number}>(
        getLayerEvent(type),
        ({width}) => Layer({
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
