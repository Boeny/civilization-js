import { Button, Text } from "modules/renderer"
import { observer, trigger } from "modules/observer"
import { LAYER_TYPE } from "screens/EditorScreen/types"
import { editorParamsMenuStore } from "./store"

const LAYER_STARTING_EVENT = 'toggle-starting-layer'

export const StartFromLayerButtonObserver = observer(LAYER_STARTING_EVENT, () => {
    const isImageLayer = editorParamsMenuStore.layer === LAYER_TYPE.image

    return Button(Text(`Start from ${isImageLayer ? 'image' : 'hex'} map layer`), {onClick: () => {
        editorParamsMenuStore.layer = isImageLayer ? LAYER_TYPE.hex : LAYER_TYPE.image
        trigger(LAYER_STARTING_EVENT)
    }})
})
