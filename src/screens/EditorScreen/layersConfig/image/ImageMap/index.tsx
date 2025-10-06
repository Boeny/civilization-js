import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { getVector, vectorMult, vectorSum } from 'utils';

import { useMapMovementParamsStore } from '../../mapMovingStore';
import { IMapProps } from '../../types';
import { useImageMapStore } from '../imageMapStore';

interface IProps extends IMapProps {
    data: HTMLImageElement;
}

const ImageMapComponent = ({ data, zIndex, screenSize }: IProps) => {
    const { zoom, position: commonPosition } = useMapMovementParamsStore().store;
    const { position: imageMapPosition } = useImageMapStore().store;

    const position = vectorSum(commonPosition, imageMapPosition);
    const originalImageSize = getVector(data.width, data.height);
    const imageSize = vectorMult(originalImageSize, zoom);

    return (
        <Canvas
            id="image-map"
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex }}
        >
            {(ctx: CanvasRenderingContext2D) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y);
                ctx.drawImage(data, position.x, position.y, imageSize.x, imageSize.y);
            }}
        </Canvas>
    );
};

export function ImageMap(props: IMapProps) {
    const { data } = useImageMapStore().store;

    if (!data) {
        return null;
    }

    return (
        <ImageMapComponent
            key={data.src}
            {...props}
            data={data}
        />
    );
}
