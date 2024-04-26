interface Point {
    x: number;
    y: number;
}

function getPointByAngle(offset: Point, angle: number, radius: number): Point {
    return {
        x: offset.x + radius * Math.cos(angle),
        y: offset.y + radius * Math.sin(angle),
    };
}

interface Params {
    ctx: CanvasRenderingContext2D;
    centerPoint: Point;
    startAngle: number;
    radius: number;
    sides: number;
}

export function Polygon({ctx, centerPoint, startAngle, radius, sides}: Params) {
    ctx.beginPath();

    const startPoint = getPointByAngle(centerPoint, startAngle, radius);
    ctx.moveTo(startPoint.x, startPoint.y);

    for (let i = 0; i < sides; i += 1) {
        const angle = i * Math.PI * 2 / sides + startAngle;
        const point = getPointByAngle(centerPoint, angle, radius);
        ctx.lineTo(point.x, point.y);
    }

    ctx.closePath();
}
