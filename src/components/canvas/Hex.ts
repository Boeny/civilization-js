import { Polygon } from './Polygon';

interface IProps {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    radius: number;
    color: string;
    isGridTurnedOn?: boolean;
}
export function Hex({ ctx, x, y, width, radius, color, isGridTurnedOn }: IProps) {
    const xOffset = y % 2 === 0 ? width / 2 : width;

    Polygon({
        ctx,
        centerPoint: {
            x: x * width + xOffset,
            y: y * radius * 1.5 + radius,
        },
        startAngle: Math.PI / 2,
        radius,
        sides: 6,
        fillColor: color,
        strokeColor: isGridTurnedOn ? '#000' : undefined,
    });
}
