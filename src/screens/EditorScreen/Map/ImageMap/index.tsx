import './styles.css';

import { Canvas } from 'components/canvas/Canvas';

import { IMapProps } from '../types';

import { LoadImageButton } from './LoadImageButton';

export function ImageMap({ isEditable, width, height, data, zIndex, onDataUpdate }: IMapProps<HTMLImageElement>) {
    console.log('image map', data);
    if (!data) {
        return (
            <div
                id="image-map"
                style={{ height: 'calc(100% - 32px)' }}
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
            style={{ zIndex }}
        >
            {(ctx) => ctx.drawImage(data, 0, 0)}
        </Canvas>
    );
}
