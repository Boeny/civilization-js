import { useEffect, useRef, useState } from 'react';

interface IProps {
    className?: string;
    title?: string;
    width?: number;
    height?: number;
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
            onClick={onClick && ctx ? (e: any) => onClick(ctx, e.offsetX, e.offsetY) : undefined}
            onMouseDown={onMouseDown && ctx ? (e: any) => onMouseDown(ctx, e.offsetX, e.offsetY) : undefined}
            onMouseMove={onMouseMove && ctx ? (e: any) => onMouseMove(ctx, e.offsetX, e.offsetY) : undefined}
            onMouseUp={onMouseUp && ctx ? (e: any) => onMouseUp(ctx, e.offsetX, e.offsetY) : undefined}
        />
    );
}
