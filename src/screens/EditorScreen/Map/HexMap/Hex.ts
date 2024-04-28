import './Hex.css';

import { HEX_CONFIG } from 'const';
import { observable } from 'hoc/observable';
import { getHexSize } from 'state/hexSizeActions';
import { getMapPoint, updateMapPointAction } from 'state/mapActions';
import { getBrush, isAnyBrushSelected } from 'state/brushActions';
import { isPainting, setPainting } from 'state/paintingActions';

import hex from 'assets/hex.svg';
import { Svg } from "components/Svg";
import { Div } from "components/Div";
import { LAYER_IMAGE_KEY } from 'screens/EditorScreen/const';

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
            ),
        )(),
        {
            className: 'hex',
            onMouseDown: () => {
                if (isAnyBrushSelected()) {
                    setPainting(true);
                    updateMapPointAction(x, y, getBrush()!, key, LAYER_IMAGE_KEY);
                }
            },
            onMouseMove: () => {
                if (isPainting()) {
                    updateMapPointAction(x, y, getBrush()!, key, LAYER_IMAGE_KEY);
                }
            },
            onMouseUp: () => {
                setPainting(false);
            },
        }
    )
}
