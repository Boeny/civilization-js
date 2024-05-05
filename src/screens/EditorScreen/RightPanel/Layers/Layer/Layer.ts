import './Layer.css'
import { LAYER_CONFIG, LAYER_TYPE } from 'const'
import { LAYER_CHANGE_EVENT } from 'screens/EditorScreen/const'
import { getClasses, trigger } from 'utils'
import { isLayerSelected, setLayerAction } from 'state/layerActions'

import { observableAttrs } from 'hoc/observable'
import { Div } from "components/base/Div"
import { MiniMap } from './MiniMap/MiniMap'
import { setPainting } from 'state/paintingActions'
import { Title } from './Title'

interface Params extends ContainerParams {
    type: LAYER_TYPE
    onClick: () => void
}

function Layer({type, width, onClick}: Params) {
    const {title} = LAYER_CONFIG[type]

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

function selectLayerAction(type: LAYER_TYPE) {
    if (isLayerSelected(type)) return

    setPainting(false)

    // some layer is always selected
    const prevSelectedLayer = setLayerAction(type)!
    trigger(getLayerEvent(prevSelectedLayer))
    trigger(getLayerEvent(type))
    trigger(LAYER_CHANGE_EVENT)
}

interface ContainerParams {
    width: number
}

export const LayerContainers = Object.keys(LAYER_CONFIG).map((key) => {
    const type = parseInt(key)

    return observableAttrs<{width: number}>(
        getLayerEvent(type),
        ({width}) => Layer({
            type,
            width,
            onClick: () => selectLayerAction(type)
        }),
        [{
            name: 'className',
            value: () => getClasses(['layer', isLayerSelected(type) ? 'selected' : undefined]),
        }]
    )
})
