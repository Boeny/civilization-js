import { Canvas, CanvasEventHandlers } from 'components/canvas/Canvas';
import { IPoint } from 'types';

import { TOP_PANEL_HEIGHT } from '../../const';

type Props = CanvasEventHandlers & {
    zIndex: number;
    screenSize: IPoint;
    opacity?: number;
    children: (ctx: CanvasRenderingContext2D) => void;
};

export function MapWrapper({ zIndex, screenSize, opacity, children, ...props }: Props) {
    const topPanelHeight = TOP_PANEL_HEIGHT;

    return (
        <Canvas
            width={screenSize.x}
            height={screenSize.y - topPanelHeight}
            style={{ zIndex, opacity, position: 'absolute' }}
            {...props}
        >
            {(ctx) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y - topPanelHeight);
                children(ctx);
            }}
        </Canvas>
    );
}
