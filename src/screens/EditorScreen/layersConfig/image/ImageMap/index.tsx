import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { getVector, vectorMult, vectorSum } from 'utils';

import { useMapMovementParamsStore } from '../../mapMovingStore';
import { IMapProps } from '../../types';
import { useImageMapStore } from '../imageMapStore';

interface IProps extends IMapProps {
    map: HTMLImageElement;
}

const ImageMapComponent = ({ map, zIndex, screenSize }: IProps) => {
    const { zoom, position: commonPosition } = useMapMovementParamsStore().store;
    const { position: imageMapPosition } = useImageMapStore().store;

    const position = vectorSum(commonPosition, imageMapPosition);
    const originalImageSize = getVector(map.width, map.height);
    const zoomedImageSize = vectorMult(originalImageSize, zoom);

    return (
        <Canvas
            id="image-map"
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex }}
        >
            {(ctx: CanvasRenderingContext2D) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y);
                ctx.drawImage(map, position.x, position.y, zoomedImageSize.x, zoomedImageSize.y);
            }}
        </Canvas>
    );
};

export function ImageMap(props: IMapProps) {
    const { map } = useImageMapStore().store;

    if (!map) {
        return null;
    }

    return (
        <ImageMapComponent
            key={map.src}
            {...props}
            map={map}
        />
    );
}
