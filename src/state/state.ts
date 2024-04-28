import { HEX_TYPE, LAYER_TYPE } from "const"
import { MapData } from "types";

interface State {
    brush: HEX_TYPE | undefined;
    isPainting: boolean;
    layer: LAYER_TYPE;
    mapData: MapData;
    hexWidth: number;
    isGridTurnedOn: boolean;
    isLeftPanelOpened: boolean;
    isRightPanelOpened: boolean;
}

export const STATE: State = {
    brush: undefined,
    isPainting: false,
    layer: LAYER_TYPE.hex,
    mapData: [],
    hexWidth: 0,
    isGridTurnedOn: true,
    isLeftPanelOpened: true,
    isRightPanelOpened: true,
}
