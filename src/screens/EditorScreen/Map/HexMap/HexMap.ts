import './HexMap.css';

import { MapData } from "types";
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { MAP_GRID_KEY, SQRT_3 } from 'screens/EditorScreen/const';
import { getMapData } from 'state/mapActions';
import { getHexWidth } from 'state/hexWidthActions';
import { isGridTurnedOn } from 'state/gridStatusActions';

import { observable } from 'hoc/observable';
import { Canvas } from 'components/Canvas/Canvas';
import { Polygon } from 'components/Canvas/Polygon';

// TODO: Ctrl+Z for painting
// TODO: scroll by wheel
// TODO: zoom by multitouch

interface Params extends ContainerParams {
    mapData: MapData;
    hexWidth: number;
    isGridTurnedOn: boolean;
}

function HexMap ({mapData, hexWidth, width, height, isGridTurnedOn}: Params) {
    const halfHexWidth = hexWidth / 2;
    const hexRadius = hexWidth / SQRT_3;

    return Canvas(
        (ctx) => {
            if (isGridTurnedOn) {
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 1;
            }

            for (let y = 0; y < mapData.length; y += 1) {
                if (y * 3 * hexRadius > height) break;

                const row = mapData[y];

                for (let x = 0; x < row.length; x += 1) {
                    if (x * hexWidth > width) break;

                    const type: HEX_TYPE = row[x];

                    ctx.fillStyle = HEX_CONFIG[type].color;

                    const xOffset = (y % 2 === 0 ? 0 : halfHexWidth) + halfHexWidth;
                    const yOffset = hexRadius;

                    Polygon({
                        ctx,
                        centerPoint: {
                            x: x * hexWidth + xOffset,
                            y: y * 3 * hexRadius / 2 + yOffset
                        },
                        startAngle: Math.PI / 2,
                        radius: hexRadius,
                        sides: 6,
                    });

                    if (isGridTurnedOn) {
                        ctx.stroke();
                    }

                    ctx.fill();
                }
            }
        },
        {
            id: 'hex-map',
            width,
            height,
            //onClick: (x, y) => console.log(x, y),
        }
    );
}

interface ContainerParams {
    width: number;
    height: number;
}

export const HexMapContainer = observable(MAP_GRID_KEY, (params: ContainerParams): HTMLElement => {
    return HexMap({
        mapData: getMapData(),
        hexWidth: getHexWidth(),
        isGridTurnedOn: isGridTurnedOn(),
        ...params,
    });
});
