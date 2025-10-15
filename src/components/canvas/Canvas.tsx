import { CSSProperties, useEffect, useRef, useState } from 'react';

import { IPoint } from 'types';
import { getVector } from 'utils';

export interface CanvasEventHandlers {
    onClick?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
    onMouseDown?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
    onMouseMove?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
    onMouseUp?: (ctx: CanvasRenderingContext2D, point: IPoint) => void;
}

interface Props extends CanvasEventHandlers {
    id?: string;
    className?: string;
    title?: string;
    width?: number;
    height?: number;
    style?: CSSProperties;
    children: (ctx: CanvasRenderingContext2D) => void;
}

export const Canvas = ({ children, onClick, onMouseDown, onMouseMove, onMouseUp, ...props }: Props) => {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (ref.current) {
            const context = ref.current.getContext('2d')!;
            children(context); // draw content
            setCtx(context); // register events
        }
    }, [children]);

    return (
        <canvas
            ref={ref}
            {...props}
            onClick={onClick && ctx ? (e) => onClick(ctx, getVector(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : undefined}
            onMouseDown={onMouseDown && ctx ? (e) => onMouseDown(ctx, getVector(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : undefined}
            onMouseMove={onMouseMove && ctx ? (e) => onMouseMove(ctx, getVector(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : undefined}
            onMouseUp={onMouseUp && ctx ? (e) => onMouseUp(ctx, getVector(e.nativeEvent.offsetX, e.nativeEvent.offsetY)) : undefined}
        />
    );
};
