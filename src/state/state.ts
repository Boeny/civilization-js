import { HEX_TYPE, LAYER_TYPE } from "const"

interface State {
    brush: HEX_TYPE | undefined;
    isPainting: boolean;
    layer: LAYER_TYPE | undefined;
}

export const STATE: State = {
    brush: undefined,
    isPainting: false,
    layer: undefined,
}
