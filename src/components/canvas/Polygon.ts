import { IPoint } from 'types';

function getPointByAngle(offset: IPoint, angle: number, radius: number): IPoint {
    return {
        x: offset.x + radius * Math.cos(angle),
        y: offset.y + radius * Math.sin(angle),
    };
}

interface IProps {
    ctx: CanvasRenderingContext2D;
    centerPoint: IPoint;
    startAngle: number;
    radius: number;
    sides: number;
    fillColor?: string;
    strokeColor?: string;
}
export function Polygon({ ctx, centerPoint, startAngle, radius, sides, fillColor, strokeColor }: IProps) {
    ctx.beginPath();

    const startPoint = getPointByAngle(centerPoint, startAngle, radius);
    ctx.moveTo(startPoint.x, startPoint.y);

    for (let i = 0; i < sides; i += 1) {
        const angle = (i * Math.PI * 2) / sides + startAngle;
        const point = getPointByAngle(centerPoint, angle, radius);
        ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();

    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }

    if (strokeColor) {
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}
