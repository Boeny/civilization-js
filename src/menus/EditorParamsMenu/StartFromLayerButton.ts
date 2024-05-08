import { observable } from "hoc/observable"
import { editorParamsMenuStore } from "./store"
import { LAYER_TYPE } from "screens/EditorScreen/types"
import { trigger } from "utils/components"
import { Button } from "components/base/Button"

const LAYER_STARTING_EVENT = 'toggle-starting-layer'

export const StartFromLayerButtonObservable = observable(LAYER_STARTING_EVENT, () => {
    const isImageLayer = editorParamsMenuStore.layer === LAYER_TYPE.image

    return Button(`Start from ${isImageLayer ? 'image' : 'hex'} map layer`, {onClick: () => {
        editorParamsMenuStore.layer = isImageLayer ? LAYER_TYPE.hex : LAYER_TYPE.image
        trigger(LAYER_STARTING_EVENT)
    }})
})
