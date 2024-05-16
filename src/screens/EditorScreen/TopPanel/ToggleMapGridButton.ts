import { Button, Text } from "modules/renderer"
import { observer, trigger } from "modules/observer"
import { LAYER_TYPE } from "../types"
import { HEX_MAP_UPDATE_EVENT, LAYER_CHANGE_EVENT } from "../const"
import { editorScreenStore } from "../store"
import { showOnLayer } from "hoc/showOnLayer"

interface IParams {
    isGridTurnedOn: boolean
    onClick: () => void
}
function ToggleMapGridButton({isGridTurnedOn, onClick}: IParams) {
    return Button(
        Text(`Grid: ${isGridTurnedOn ? 'On' : 'Off'}`),
        {onClick, style: {padding: '6px 20px'}}
    )
}


const ToggleGridMapButtonClickHandlerObserver = observer(HEX_MAP_UPDATE_EVENT, () => {
    const {isGridTurnedOn} = editorScreenStore

    return ToggleMapGridButton({
        isGridTurnedOn: isGridTurnedOn.value,
        onClick: () => {
            isGridTurnedOn.value = !isGridTurnedOn.value
            trigger(HEX_MAP_UPDATE_EVENT)
        }
    })
})


export const ToggleMapGridButtonToggleObserver = showOnLayer(LAYER_CHANGE_EVENT, LAYER_TYPE.hex, ToggleGridMapButtonClickHandlerObserver)
