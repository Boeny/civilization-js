import './ImageContainer.css';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { Polygon } from 'components/Canvas/Polygon';
import { Canvas } from 'components/Canvas/Canvas';
import { MapData } from 'types';

export function ImageContainer(mapData: MapData, width: number, title: string) {
    const hexSize = width / mapData[0].length;
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
            className: 'image-container',
            title,
            width: width + halfHexWidth,
            height: 3 * hexRadius * mapData.length / 2 + hexRadius / 2, // diameter * length / 2 + radius * length / 2 + radius
        }
    );
}
