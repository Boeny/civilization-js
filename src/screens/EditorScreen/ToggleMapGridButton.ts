import { HEX_MAP_KEY } from "./const";
import { isGridTurnedOn, setGridTurnedOn } from 'state/gridStatusActions';
import { trigger } from "utils";
import { observable } from "hoc/observable";
import { Button } from "components/Button/Button";

interface Params {
    isGridTurnedOn: boolean;
    onClick: () => void;
}

function ToggleMapGridButton({isGridTurnedOn, onClick}: Params) {
    return Button(`Grid: ${isGridTurnedOn ? 'On' : 'Off'}`, {onClick, padding: '6px 20px'});
}

export const ToggleMapGridButtonContainer = observable(HEX_MAP_KEY, () => {
    const isGridOn = isGridTurnedOn();

    return ToggleMapGridButton({
        isGridTurnedOn: isGridOn,
        onClick: () => {
            setGridTurnedOn(!isGridOn);
            trigger(HEX_MAP_KEY);
        },
    },)
});
