import './BrushButton.css'
import { HEX_CONFIG, HEX_TYPE } from "const"
import { isAnyBrushSelected, isBrushSelected, setBrushAction, toggleBrushAction } from 'state/brushActions'
import { getClasses, trigger } from 'utils'
import { observableAttrs } from 'hoc/observable'
import { Div } from "components/base/Div"

function getBrushEvent(type: HEX_TYPE): string {
    return 'brush-button' + type
}

function getBrushClassName(type: HEX_TYPE): string {
    return getClasses(['brush', isBrushSelected(type) ? 'selected' : undefined])
}

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


function selectBrushAction(type: HEX_TYPE) {
    if (isAnyBrushSelected() && !isBrushSelected(type)) {
        const prevSelectedBrush = setBrushAction(type)!
        trigger(getBrushEvent(prevSelectedBrush))
    } else {
        toggleBrushAction(type)
    }

    trigger(getBrushEvent(type))
}

export const BrushButtonContainers = Object.keys(HEX_CONFIG).map((key) => {
    const type = parseInt(key)
    const event = getBrushEvent(type)

    return observableAttrs(event,
        () => BrushButton({type, onClick: () => selectBrushAction(type)}),
        [{
            name: 'className',
            value: () => getBrushClassName(type),
        }]
    )
})
