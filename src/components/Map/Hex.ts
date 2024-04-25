import './Hex.css';

import { observable } from 'hoc/observer';
import { getHexSize } from 'state/state';
import { getMapPoint, updateMapPointAction } from 'state/mapActions';
import { getBrush, isAnyBrushSelected } from 'state/brushActions';
import { isPainting, setPainting } from 'state/paintingActions';
import { HEX_CONFIG } from 'const';

import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";

function getHexKey(x: number, y: number): string {
    return 'hex-'+x+'-'+y;
}

export function Hex(x: number, y: number) {
    const key = getHexKey(x, y);

    return Div(
        observable(key, () =>
            Svg(
                hex,
                {
                    width: getHexSize(),
                    color: HEX_CONFIG[getMapPoint(x, y)].color
                }
            )
        ),
        {
            className: 'hex',
            onMouseDown: () => {
                if (isAnyBrushSelected()) {
                    setPainting(true);
                    updateMapPointAction(x, y, getBrush()!, getHexKey);
                }
            },
            onMouseMove: () => {
                if (isPainting()) {
                    updateMapPointAction(x, y, getBrush()!, getHexKey);
                }
            },
            onMouseUp: () => {
                setPainting(false);
            },
        }
    )
}
