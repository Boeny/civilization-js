import { IPoint } from 'types';
import { getVector } from 'utils';

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
    const height = radius * 1.5;

    Polygon({
        ctx,
        centerPoint: getVector(position.x * width + xOffset + (offset?.x || 0), position.y * height + radius + (offset?.y || 0)),
        startAngle: Math.PI / 2,
        radius,
        sides: 6,
        fillColor: color,
        strokeColor: isGridTurnedOn ? '#000' : undefined,
    });
}
