import { CSSProperties, useEffect, useRef, useState } from 'react';

interface IProps {
    id?: string;
    className?: string;
    title?: string;
    width?: number;
    height?: number;
    style?: CSSProperties;
    onClick?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseDown?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseMove?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseUp?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    children: (ctx: CanvasRenderingContext2D) => void;
}
export function Canvas({ children, onClick, onMouseDown, onMouseMove, onMouseUp, ...props }: IProps) {
    const ref = useRef<HTMLCanvasElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        if (ref.current) {
            const context = ref.current.getContext('2d')!;
            children(context);
            setCtx(context);
        }
    }, [children]);

    return (
        <canvas
            ref={ref}
            {...props}
            onClick={onClick && ctx ? (e) => onClick(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : undefined}
            onMouseDown={onMouseDown && ctx ? (e) => onMouseDown(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : undefined}
            onMouseMove={onMouseMove && ctx ? (e) => onMouseMove(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : undefined}
            onMouseUp={onMouseUp && ctx ? (e) => onMouseUp(ctx, e.nativeEvent.offsetX, e.nativeEvent.offsetY) : undefined}
        />
    );
}
