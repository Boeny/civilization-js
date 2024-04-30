import { LAYER_TYPE } from "const";
import { HEX_MAP_KEY, MAP_KEY } from "./const";

import { trigger } from "utils";
import { isGridTurnedOn, setGridTurnedOn } from 'state/gridStatusActions';

import { observable } from "hoc/observable";
import { showOnLayer } from "hoc/showOnLayer";

import { Button } from "components/Button/Button";

interface Params {
    isGridTurnedOn: boolean;
    onClick: () => void;
}

function ToggleMapGridButton({isGridTurnedOn, onClick}: Params) {
    return Button(`Grid: ${isGridTurnedOn ? 'On' : 'Off'}`, {onClick, padding: '6px 20px'});
}

const ButtonClickHandlerContainer = observable(HEX_MAP_KEY, () => {
    const isGridOn = isGridTurnedOn();

    return ToggleMapGridButton({
        isGridTurnedOn: isGridOn,
        onClick: () => {
            setGridTurnedOn(!isGridOn);
            trigger(HEX_MAP_KEY);
        },
    },)
})

export const ToggleMapGridButtonContainer = showOnLayer(MAP_KEY, LAYER_TYPE.hex, ButtonClickHandlerContainer);
