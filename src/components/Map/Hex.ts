import './Hex.css';

import { observable } from 'hoc/observer';
import { getBrush, isAnyBrushSelected } from 'state/brushActions';
import { isPainting, setPainting } from 'state/paintingActions';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { trigger } from 'utils';

import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";

export function Hex(x: number, y: number, size: number, type: HEX_TYPE) {
    const key = x+'-'+y;
    let color = HEX_CONFIG[type].color;

    return Div(
            observable(key, () => Svg(hex, {width: size, color})),
            {
                className: 'hex',
                onMouseDown: () => {
                    if (isAnyBrushSelected()) {
                        color = HEX_CONFIG[getBrush()!].color;
                        setPainting(true);
                        trigger(key);
                    }
                },
                onMouseMove: () => {
                    if (isPainting()) {
                        const newColor = HEX_CONFIG[getBrush()!].color;

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
}
