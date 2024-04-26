import './ImageContainer.css';
import { MapData } from 'types';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { getMapData } from 'state/mapActions';
import { Polygon } from 'components/Canvas/Polygon';
import { Canvas } from 'components/Canvas/Canvas';

export function ImageContainer(width: number, title: string) {
    const mapData = getMapData();

    const hexWidth = width / mapData[0].length;
    const halfHexWidth = hexWidth / 2;
    const hexRadius = hexWidth / Math.sqrt(3);

    return Canvas(
        (ctx) => {
            //ctx.strokeStyle = '#000';
            //ctx.lineWidth = 1;

            mapData.forEach((row, y) => {
                row.forEach((type: HEX_TYPE, x) => {
                    ctx.fillStyle = HEX_CONFIG[type].color;

                    const xOffset = (y % 2 === 0 ? 0 : halfHexWidth) + halfHexWidth;
                    const yOffset = hexRadius;

                    Polygon(ctx, {x: x * hexWidth + xOffset, y: y * 3 * hexRadius / 2 + yOffset}, Math.PI / 2, hexRadius, 6);

                    //ctx.stroke();
                    ctx.fill();
                })
            })
        },
        {
            className: 'image-container',
            title,
            width: width + halfHexWidth,
            height: 3 * hexRadius * mapData.length / 2 + hexRadius, // diameter * length / 2 + radius * length / 2 + radius
        }
    );
}
