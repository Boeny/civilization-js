import { memo } from 'react';

import { Canvas } from 'components/canvas/Canvas';

import { IMiniMapProps } from './types';

export const ImageMiniMap = memo(({ data, title, ...props }: IMiniMapProps<ImageBitmap>) => {
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
