interface Params {
    width: number;
}

export function Svg(source: string, {width}: Params): string {
    return source.replace('width=""', `width="${width}"`);
}
