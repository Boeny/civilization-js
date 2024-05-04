import { LAYER_TYPE } from "const"
import { HEX_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from "../const"
import { trigger } from "utils"
import { isGridTurnedOn, setGridTurnedOn } from 'state/gridStatusActions'

import { observable } from "hoc/observable"
import { showOnLayer } from "hoc/showOnLayer"
import { Button } from "components/base/Button/Button"

interface Params {
    isGridTurnedOn: boolean
    onClick: () => void
}

function ToggleMapGridButton({isGridTurnedOn, onClick}: Params) {
    return Button(
        `Grid: ${isGridTurnedOn ? 'On' : 'Off'}`,
        {onClick, style: {padding: '6px 20px'}}
    )
}

const ToggleMapButtonHandlerContainer = observable(HEX_MAP_UPDATE_EVENT, () => {
    const isGridOn = isGridTurnedOn()

    return ToggleMapGridButton({
        isGridTurnedOn: isGridOn,
        onClick: () => {
            setGridTurnedOn(!isGridOn)
            trigger(HEX_MAP_UPDATE_EVENT)
        }
    })
})

export const ToggleMapGridButtonContainer = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, ToggleMapButtonHandlerContainer)
