/* eslint-disable @typescript-eslint/no-unused-vars */
interface IProps {
    data: CanvasImageSource;
    width: number;
    title: string;
}
export function ImageMiniMap({ data, width, title }: IProps) {
    return null;
    // return Canvas(
    //     (ctx) => {
    //         ctx.drawImage(data, 0, 0, width - 29, width > 170 ? 170 : width);
    //     },
    //     {
    //         title,
    //         width: width - 29,
    //         height: width > 170 ? 170 : width,
    //     },
    // );
}
