import arrow from 'assets/arrow_down.svg';
import { Button } from "components/Button/Button";
import { Svg } from "components/Svg";

interface Params {
    onClick: () => void;
}

export function ToggleRightPanelButton({onClick}: Params) {
    return Button(Svg(arrow, {width: 20}), {onClick, padding: '0 11px'});
}
