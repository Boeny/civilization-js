import { HEX_CONFIG, HEX_TYPE } from 'const';
import { Polygon } from 'components/Canvas/Polygon';

interface Params {
    ctx: CanvasRenderingContext2D;
    x: number;
    y: number;
    width: number;
    radius: number;
    type: HEX_TYPE;
    isGridTurnedOn?: boolean;
}

export function Hex({ctx, x, y, width, radius, type, isGridTurnedOn}: Params) {
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
        fillColor: HEX_CONFIG[type].color,
        strokeColor: isGridTurnedOn ? '#000' : undefined,
    });
}
