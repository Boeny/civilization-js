import './Hex.css';
import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";
import { HEX_COLOR, HEX_TYPE } from 'const';
import { getBrush, isAnyBrushSelected, isPainting, setPainting } from 'state';
import { observable } from 'hoc/observer';
import { trigger } from 'utils';

export function Hex(x: number, y: number, size: number, type: HEX_TYPE) {
    const key = x+'-'+y;
    let color = HEX_COLOR[type];

    return observable(key, () =>
        Div(
            Svg(hex, {width: size, color}),
            {
                className: 'hex',
                onMouseDown: () => {
                    if (isAnyBrushSelected()) {
                        color = HEX_COLOR[getBrush()!];
                        setPainting(true);
                        trigger(key);
                    }
                },
                onMouseMove: () => {
                    if (isPainting()) {
                        const newColor = HEX_COLOR[getBrush()!];

                        if (color != newColor) {
                            color = newColor;
                            trigger(key);
                        }
                    }
                },
                onMouseUp: () => {
                    setPainting(false);
                },
            }
        )
    )
}
