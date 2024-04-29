type CanvasComponent = (ctx: CanvasRenderingContext2D) => void;

interface Params {
    id?: string;
    className?: string;
    width?: number;
    height?: number;
    title?: string;
    onClick?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseDown?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseMove?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
    onMouseUp?: (ctx: CanvasRenderingContext2D, x: number, y: number) => void;
}

export function Canvas(content: CanvasComponent | CanvasComponent[], params?: Params) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    if (params?.id) canvas.id = params.id;
    if (params?.className) canvas.className = params.className;
    if (params?.width) canvas.width = params.width;
    if (params?.height) canvas.height = params.height;
    if (params?.title) canvas.title = params.title;

    if (params?.onClick) {
        canvas.onclick = (e) => {
            params?.onClick?.(ctx, e.offsetX, e.offsetY);
        }
    }
    if (params?.onMouseDown) {
        canvas.onmousedown = (e) => {
            params?.onMouseDown?.(ctx, e.offsetX, e.offsetY);
        }
    }
    if (params?.onMouseMove) {
        canvas.onmousemove = (e) => {
            params?.onMouseMove?.(ctx, e.offsetX, e.offsetY);
        }
    }
    if (params?.onMouseUp) {
        canvas.onmouseup = (e) => {
            params?.onMouseUp?.(ctx, e.offsetX, e.offsetY);
        }
    }

    const components = Array.isArray(content) ? content : [content];

    components.forEach((component) => component(ctx));

    return canvas;
}
