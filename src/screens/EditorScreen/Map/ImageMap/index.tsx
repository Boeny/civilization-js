import './styles.css';

import { Canvas } from 'components/canvas/Canvas';

import { IMapProps } from '../types';

import { LoadImageButton } from './LoadImageButton';

export function ImageMap({ width, height, data, zIndex, onDataUpdate }: IMapProps<HTMLImageElement>) {
    if (!data) {
        return (
            <div
                id="image-map"
                style={{ height: 'calc(100% - 32px)' }}
            >
                <LoadImageButton onDataUpdate={onDataUpdate} />
            </div>
        );
    }

    return (
        <Canvas
            id="image-map"
            width={width}
            height={height}
            style={{ zIndex }}
        >
            {(ctx) => ctx.drawImage(data, 0, 0)}
        </Canvas>
    );
}
