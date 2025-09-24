import { IPoint } from 'types';

import { Polygon } from './Polygon';

interface IProps {
    ctx: CanvasRenderingContext2D;
    position: IPoint;
    offset?: IPoint;
    width: number;
    radius: number;
    color: string;
    isGridTurnedOn?: boolean;
}
export function Hex({ ctx, position, offset, width, radius, color, isGridTurnedOn }: IProps) {
    const xOffset = position.y % 2 === 0 ? width / 2 : width;

    Polygon({
        ctx,
        centerPoint: {
            x: position.x * width + xOffset + (offset?.x || 0),
            y: position.y * radius * 1.5 + radius + (offset?.y || 0),
        },
        startAngle: Math.PI / 2,
        radius,
        sides: 6,
        fillColor: color,
        strokeColor: isGridTurnedOn ? '#000' : undefined,
    });
}
