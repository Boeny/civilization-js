import { HEX_TYPE, LAYER_TYPE } from "const"
import { MapData } from "types";

interface State {
    brush: HEX_TYPE | undefined;
    isPainting: boolean;
    layer: LAYER_TYPE | undefined;
    mapData: MapData;
    hexSize: number;
    isGridTurnedOn: boolean;
    isLeftPanelOpened: boolean;
    isRightPanelOpened: boolean;
}

export const STATE: State = {
    brush: undefined,
    isPainting: false,
    layer: undefined,
    mapData: [],
    hexSize: 0,
    isGridTurnedOn: true,
    isLeftPanelOpened: true,
    isRightPanelOpened: true,
}
