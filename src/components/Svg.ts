interface Params {
    width?: number;
    color?: string;
}

export function Svg(source: string, params?: Params) {
    let result = source;

    if (params?.width) {
        result = result.replace('width=""', `width="${params.width}"`);
    }
    if (params?.color) {
        result = result.replace('fill="none"', `fill="${params.color}"`);
    }

    return result;
}
