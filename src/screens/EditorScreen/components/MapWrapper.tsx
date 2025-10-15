import { Canvas, CanvasEventHandlers } from 'components/canvas/Canvas';
import { IPoint } from 'types';

type Props = CanvasEventHandlers & {
    id: string;
    zIndex: number;
    screenSize: IPoint;
    opacity?: number;
    children: (ctx: CanvasRenderingContext2D) => void;
};

export function MapWrapper({ id, zIndex, screenSize, opacity, children, ...props }: Props) {
    return (
        <Canvas
            id={id}
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex, opacity }}
            {...props}
        >
            {(ctx) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y);
                children(ctx);
            }}
        </Canvas>
    );
}
