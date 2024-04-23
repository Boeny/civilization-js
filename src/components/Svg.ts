interface Params {
    width: number;
    color: string;
}

export function Svg(source: string, {width, color}: Params) {
    return source.replace('width=""', `width="${width}"`).replace('fill="none"', `fill="${color}"`);
}
