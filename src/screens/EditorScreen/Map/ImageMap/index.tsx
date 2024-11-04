import './styles.css';

import { Canvas } from 'components/canvas/Canvas';

import { IMapProps } from '../types';

import { LoadImageButton } from './LoadImageButton';

export function ImageMap({ isEditable, opacity, width, height, data, zIndex, onDataUpdate }: IMapProps<HTMLImageElement>) {
    if (!data) {
        return (
            <div
                id="image-map"
                style={{ height: 'calc(100% - 32px)', zIndex, opacity }}
            >
                <LoadImageButton
                    disabled={!isEditable}
                    onDataUpdate={onDataUpdate}
                />
            </div>
        );
    }

    return (
        <Canvas
            id="image-map"
            width={width}
            height={height}
            style={{ zIndex, opacity }}
        >
            {(ctx) => ctx.drawImage(data, 0, 0)}
        </Canvas>
    );
}
