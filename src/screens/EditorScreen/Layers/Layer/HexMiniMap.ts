import './HexMiniMap.css';
import { MapData } from 'types';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { LAYER_IMAGE_KEY, SQRT_3 } from 'screens/EditorScreen/const';
import { getMapData } from 'state/mapActions';
import { observable } from 'hoc/observable';
import { Polygon } from 'components/Canvas/Polygon';
import { Canvas } from 'components/Canvas/Canvas';

function HexMiniMap(mapData: MapData, width: number, title: string) {
    const hexWidth = width / mapData[0].length;
    const halfHexWidth = hexWidth / 2;
    const hexRadius = hexWidth / SQRT_3;

    return Canvas(
        (ctx) => {
            mapData.forEach((row, y) => {
                row.forEach((type: HEX_TYPE, x) => {
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

                    ctx.fill();
                })
            })
        },
        {
            className: 'hex-mini-map',
            title,
            width: width + halfHexWidth,
            height: 3 * hexRadius * mapData.length / 2 + hexRadius / 2, // diameter * length / 2 + radius * length / 2 + radius
        }
    );
}

export const HexMiniMapContainer = observable(LAYER_IMAGE_KEY, ({width, title}: any) => {
    return HexMiniMap(getMapData(), width - 29, title);
})
