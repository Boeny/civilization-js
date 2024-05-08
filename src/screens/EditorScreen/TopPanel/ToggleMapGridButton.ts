import { HEX_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from "../const"
import { trigger } from "utils/components"
import { editorScreenStore } from "../store"
import { observable } from "hoc/observable"
import { showOnLayer } from "hoc/showOnLayer"
import { Button } from "components/base/Button"
import { LAYER_TYPE } from "../types"

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


const ToggleGridMapButtonClickHandleObservable = observable(HEX_MAP_UPDATE_EVENT, () => {
    const {isGridTurnedOn} = editorScreenStore

    return ToggleMapGridButton({
        isGridTurnedOn: isGridTurnedOn.value,
        onClick: () => {
            isGridTurnedOn.value = !isGridTurnedOn.value
            trigger(HEX_MAP_UPDATE_EVENT)
        }
    })
})


export const ToggleMapGridButtonToggleObservable = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, ToggleGridMapButtonClickHandleObservable)
