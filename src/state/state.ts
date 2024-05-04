import { HEX_TYPE, LAYER_TYPE, MENU_TYPE, SCREEN_TYPE } from "const"
import { MapData } from "types"

export interface MenuParams {
    current: MENU_TYPE | null
    parent: MENU_TYPE | null
}

export interface ScreenParams {
    type: SCREEN_TYPE
    width: number
    height: number
    hexWidth: number
}

export interface State {
    brush: HEX_TYPE | null
    isPainting: boolean
    layer: LAYER_TYPE
    hexMapData: MapData
    imageMapData: CanvasImageSource | null
    isGridTurnedOn: boolean
    isLeftPanelOpened: boolean
    isRightPanelOpened: boolean
    openedMenu: MenuParams
    screenParams: ScreenParams | null
}

const DEFAULT_STATE: State = {
    brush: null,
    isPainting: false,
    layer: LAYER_TYPE.hex,
    hexMapData: [],
    imageMapData: null,
    isGridTurnedOn: true,
    isLeftPanelOpened: true,
    isRightPanelOpened: true,
    openedMenu: {current: MENU_TYPE.main, parent: null},
    screenParams: null,
}

export const STATE: State = {...DEFAULT_STATE}

export function setDefaultStateAction(params?: Partial<State>) {
    for (let key in DEFAULT_STATE) {
        (STATE as any)[key] = (DEFAULT_STATE as any)[key]
    }
    for (let key in params) {
        (STATE as any)[key] = (params as any)[key]
    }
}
