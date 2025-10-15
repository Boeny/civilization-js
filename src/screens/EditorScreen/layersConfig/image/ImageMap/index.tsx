import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { getVector, vectorMult, vectorSum } from 'utils';

import { IMapProps } from '../../types';
import { useImageMapStore } from '../imageMapStore';

interface IProps extends IMapProps {
    map: HTMLImageElement;
}

const ImageMapComponent = ({ map, zIndex, screenSize }: IProps) => {
    const { zoom: commonZoom, position: commonPosition } = useMapMovementParamsStore().store;
    const { position: imageMapPosition, zoom: imageMapZoom } = useImageMapStore().store;

    const position = vectorSum(commonPosition, imageMapPosition);
    const zoom = commonZoom * imageMapZoom;
    const zoomedImageSize = vectorMult(getVector(map.width, map.height), zoom);

    return (
        <Canvas
            id="image-map"
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex }}
        >
            {(ctx) => {
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
