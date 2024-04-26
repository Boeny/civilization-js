import './ImageContainer.css';
import { MapData } from 'types';
import { HEX_CONFIG, HEX_TYPE } from 'const';
import { getMapData } from 'state/mapActions';

function drawPoly(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, sides: number) {
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    for (let i = 0; i < sides; i += 1) {
        const angle = i * Math.PI * 2 / sides + Math.PI / 2;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
    }
    ctx.closePath();
    //ctx.stroke();
    ctx.fill();
}

function getImageSrc(mapData: MapData) {
    const canvas = document.createElement('canvas');
    canvas.className = 'image-container';

    const imageWidth = 174;
    const hexWidth = imageWidth / mapData[0].length;
    const halfHexWidth = hexWidth / 2;
    const hexRadius = hexWidth / Math.sqrt(3);

    canvas.width = imageWidth + halfHexWidth;
    canvas.height = 3 * hexRadius * mapData.length / 2 + hexRadius; // diameter * length / 2 + radius * length / 2 + radius

    const ctx = canvas.getContext('2d')!;

    //ctx.strokeStyle = '#000';
    //ctx.lineWidth = 1;

    mapData.forEach((row, y) => {
        row.forEach((type: HEX_TYPE, x) => {
            ctx.fillStyle = HEX_CONFIG[type].color;

            const xOffset = (y % 2 === 0 ? 0 : halfHexWidth) + halfHexWidth;
            const yOffset = hexRadius;

            drawPoly(ctx, x * hexWidth + xOffset, y * 3 * hexRadius / 2 + yOffset, hexRadius, 6);
        })
    })

    return canvas;
}

export function ImageContainer(title: string) {
    return getImageSrc(getMapData());
}
