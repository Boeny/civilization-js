import { memo } from 'react';

import { Canvas } from 'components/canvas/Canvas';

interface IProps {
    data: CanvasImageSource;
    width: number;
    title: string;
}
export const ImageMiniMap = memo(({ data, title, ...props }: IProps) => {
    const width = props.width - 29;
    const height = props.width > 170 ? 170 : props.width;

    return (
        <Canvas
            title={title}
            width={width}
            height={height}
            style={{ maxHeight: 170 }}
        >
            {(ctx) => {
                ctx.drawImage(data, 0, 0, width, height);
            }}
        </Canvas>
    );
});
