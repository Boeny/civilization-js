type CanvasComponent = (ctx: CanvasRenderingContext2D) => void;

interface Params {
    id?: string;
    className?: string;
    width?: number;
    height?: number;
    title?: string;
    onClick?: (x: number, y: number) => void;
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
            params?.onClick?.(e.clientX, e.clientY);
        }
    }

    const components = Array.isArray(content) ? content : [content];

    components.forEach((component) => component(ctx));

    return canvas;
}
