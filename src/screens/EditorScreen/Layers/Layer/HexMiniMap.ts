import './HexMiniMap.css';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { Polygon } from 'components/Canvas/Polygon';
import { Canvas } from 'components/Canvas/Canvas';
import { MapData } from 'types';
import { getMapData } from 'state/mapActions';
import { observable } from 'hoc/observable';
import { LAYER_IMAGE_KEY } from 'screens/EditorScreen/const';

function HexMiniMap(mapData: MapData, width: number, title: string) {
    const hexSize = width / mapData[0].length;
    const halfHexWidth = hexSize / 2;
    const hexRadius = hexSize / Math.sqrt(3);

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
                            x: x * hexSize + xOffset,
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
