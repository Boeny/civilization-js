import { Canvas } from "components/Canvas/Canvas";
import { LAYER_TYPE } from "const";
import { observable } from "hoc/observable";
import { LAYER_MAP_KEY } from "../const";
import { HexMapContainer } from "./HexMap/HexMap";
import { getLayer } from "state/layerActions";

interface Params extends ContainerParams {
    layer: LAYER_TYPE
}

function Map({layer, width, height}: Params) {
    switch (layer) {
        case LAYER_TYPE.hex: return HexMapContainer({width, height})
        default: return Canvas(() => {}, {width, height})
    }
}

interface ContainerParams {
    width: number;
    height: number;
}

export const MapContainer = observable(LAYER_MAP_KEY, (params: ContainerParams) => {
    return Map({
        layer: getLayer(),
        ...params,
    })
})
