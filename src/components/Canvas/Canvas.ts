type CanvasComponent = (ctx: CanvasRenderingContext2D) => void;

interface Params {
    className?: string;
    width?: number;
    height?: number;
    title?: string;
}

export function Canvas(content: CanvasComponent | CanvasComponent[], params?: Params) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    if (params?.className) canvas.className = params.className;
    if (params?.width) canvas.width = params.width;
    if (params?.height) canvas.height = params.height;
    if (params?.title) canvas.title = params.title;

    const components = Array.isArray(content) ? content : [content];

    components.forEach((component) => component(ctx));

    return canvas;
}
