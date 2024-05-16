import { LAYER_TYPE } from "screens/EditorScreen/types"
import { FComponent, observer } from "modules/observer"
import { editorScreenStore } from "screens/EditorScreen/store"

export const showOnLayer = <T>(event: string, layer: LAYER_TYPE, component: FComponent<T>) => {
    return observer<T>(event, (params) =>
        editorScreenStore.layer.value === layer ? component(params) : null
    )
}
