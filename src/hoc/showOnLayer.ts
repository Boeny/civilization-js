import { ContentElement } from "types";
import { LAYER_TYPE } from "const";
import { getLayer } from "state/layerActions";
import { observable } from "./observable";

export const showOnLayer = <T>(key: string, layer: LAYER_TYPE, component: (params: T) => ContentElement) => {
    return observable<T>(key, (params) => {
        return getLayer() === layer ? component(params) : null;
    })
}
