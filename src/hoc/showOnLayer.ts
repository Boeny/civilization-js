import { LAYER_TYPE } from "screens/EditorScreen/types"
import { FComponent, observer } from "modules/observer"
import { editorScreenStore } from "screens/EditorScreen/store"

export const showOnLayer = <F extends FComponent>(event: string, layer: LAYER_TYPE, component: F) => {
    return observer(event, (...params: Parameters<F>) =>
        editorScreenStore.layer.value === layer ? component(...params) : null
    )
}
