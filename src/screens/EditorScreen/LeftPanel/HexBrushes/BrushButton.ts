import './BrushButton.css'
import { observableAttrs } from 'hoc/observable'
import { Div } from "components/base/Div"
import { editorScreenStore } from 'screens/EditorScreen/store'
import { HEX_TYPE } from 'screens/EditorScreen/types'
import { HEX_CONFIG } from 'screens/EditorScreen/const'
import { getClasses, trigger } from 'utils/components'

interface Params {
    type: HEX_TYPE
    onClick: () => void
}
function BrushButton({type, onClick}: Params) {
    const {title, color} = HEX_CONFIG[type]

    return Div(
        title,
        {
            style: {background: color},
            onClick
        }
    )
}


function getBrushEvent(type: HEX_TYPE): string {
    return 'brush-button' + type
}

export const BrushButtonObservableAttrs = Object.keys(HEX_CONFIG).map((key) => {
    const type = parseInt(key)
    const event = getBrushEvent(type)

    return observableAttrs(event,
        () => BrushButton({type, onClick: () => {
            const {brush} = editorScreenStore

            if (brush.value !== null && brush.value !== type) {
                const prev = brush.value
                brush.value = type
                trigger(getBrushEvent(prev))
            } else {
                brush.value = null
            }

            trigger(getBrushEvent(type))
        }}),
        [{
            name: 'className',
            value: () => getClasses(['brush', editorScreenStore.brush.value === type ? 'selected' : undefined]),
        }]
    )
})
