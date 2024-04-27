import { Button } from "components/Button/Button";
import { observable } from "hoc/observable";
import { MAP_GRID_KEY } from "screens/const";
import { isGridTurnedOn, setGridTurnedOn } from 'state/gridStatusActions';
import { trigger } from "utils";

interface Params {
    isGridTurnedOn: boolean;
    onClick: () => void;
}

function ToggleMapGridButton({isGridTurnedOn, onClick}: Params) {
    return Button(`Grid: ${isGridTurnedOn ? 'On' : 'Off'}`, {onClick, padding: '6px 20px'});
}

export const ToggleMapGridButtonContainer = observable(MAP_GRID_KEY, () => {
    const isGridOn = isGridTurnedOn();

    return ToggleMapGridButton({
        isGridTurnedOn: isGridOn,
        onClick: () => {
            setGridTurnedOn(!isGridOn);
            trigger(MAP_GRID_KEY);
        },
    },)
});
