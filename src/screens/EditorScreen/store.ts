/* eslint-disable import/no-unused-modules */
import { HEX_TYPE, LAYER_TYPE, MapData } from './types';

interface IState {
    brush: HEX_TYPE | null;
    layer: LAYER_TYPE;
    isPainting: boolean;
    hexWidth: number;
    hexMapData: MapData | null;
    imageMapData: CanvasImageSource | null;
    isGridTurnedOn: boolean;
    isLeftPanelOpened: boolean;
    isRightPanelOpened: boolean;
}

export const DEFAULT_STATE: IState = {
    brush: null,
    layer: LAYER_TYPE.image,
    isPainting: false,
    hexWidth: 0,
    hexMapData: null,
    imageMapData: null,
    isGridTurnedOn: true,
    isLeftPanelOpened: true,
    isRightPanelOpened: true,
};
