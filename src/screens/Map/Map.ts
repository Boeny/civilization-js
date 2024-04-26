import './Map.css';
import { MapData } from "types";
import { Canvas } from 'components/Canvas/Canvas';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { Polygon } from 'components/Canvas/Polygon';

export interface Params {
    mapData: MapData;
    hexSize: number;
}

export function Map ({mapData, hexSize}: Params) {
    const width = mapData[0].length * hexSize;
    const halfHexWidth = hexSize / 2;
    const hexRadius = hexSize / Math.sqrt(3);

    return Canvas(
        (ctx) => {
            //ctx.strokeStyle = '#000';
            //ctx.lineWidth = 1;

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

                    //ctx.stroke();
                    ctx.fill();
                })
            })
        },
        {
            id: 'map',
            width: width + halfHexWidth,
            height: 3 * hexRadius * mapData.length / 2 + hexRadius / 2, // diameter * length / 2 + radius * length / 2 + radius / 2
        }
    );
}
