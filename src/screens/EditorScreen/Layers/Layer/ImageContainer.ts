import { getMapData } from 'state/state';
import './ImageContainer.css';
import { Img } from "components/Img";
import { MapData } from 'types';
import { HEX_CONFIG, HEX_TYPE } from 'const';

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

function getImageSrc(mapData: MapData): string {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;

    mapData.forEach((row, y) => {
        row.forEach((type: HEX_TYPE, x) => {
            ctx.fillStyle = HEX_CONFIG[type].color;

            const width = 183.15 / row.length;
            const radius = width / Math.sqrt(3);
            const height = 2 * radius;
            const xOffset = y % 2 === 0 ? width : width / 2;

            drawPoly(ctx, x * width + xOffset, y * 3 * radius / 2 + radius, radius, 6);
        })
    })

    return canvas.toDataURL();
}

export function ImageContainer(title: string) {
    return Img(getImageSrc(getMapData()), {className: 'image-container', alt: title, title})
}
