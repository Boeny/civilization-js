import { PreviousValueStore, SimpleValueStore } from "types/stores"
import { HEX_TYPE, HexMapStore, LAYER_TYPE, MapData } from "./types"

interface State {
    brush: HEX_TYPE | null
    layer: LAYER_TYPE
    isPainting: boolean
    hexWidth: number
    hexMapData: MapData | null,
    imageMapData: CanvasImageSource | null,
    isGridTurnedOn: boolean,
    isLeftPanelOpened: boolean,
    isRightPanelOpened: boolean,
}

const DEFAULT_STATE: State = {
    brush: null,
    layer: LAYER_TYPE.image,
    isPainting: false,
    hexWidth: 0,
    hexMapData: null,
    imageMapData: null,
    isGridTurnedOn: true,
    isLeftPanelOpened: true,
    isRightPanelOpened: true,
}

export const editorScreenStore = {
    brush: new SimpleValueStore<HEX_TYPE | null>(DEFAULT_STATE.brush),
    layer: new SimpleValueStore<LAYER_TYPE>(DEFAULT_STATE.layer),
    isPainting: new SimpleValueStore<boolean>(DEFAULT_STATE.isPainting),
    hexWidth: new SimpleValueStore<number>(0),
    hexMapData: new HexMapStore(DEFAULT_STATE.hexMapData),
    imageMapData: new PreviousValueStore<CanvasImageSource | null>(DEFAULT_STATE.imageMapData),
    isGridTurnedOn: new SimpleValueStore<boolean>(DEFAULT_STATE.isGridTurnedOn),
    isLeftPanelOpened: new SimpleValueStore<boolean>(DEFAULT_STATE.isLeftPanelOpened),
    isRightPanelOpened: new SimpleValueStore<boolean>(DEFAULT_STATE.isRightPanelOpened),
}

export function resetEditorScreenStore(params: Partial<State> = {}) {
    for (let key in DEFAULT_STATE) {
        const field = key as keyof State
        editorScreenStore[field].value = params[field] !== undefined ? params[field]! : DEFAULT_STATE[field]
    }
}