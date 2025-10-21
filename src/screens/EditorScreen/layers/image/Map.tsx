import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { getVector, vectorMult, vectorSum } from 'utils';

import { MapWrapper } from '../components/MapWrapper';
import { IMapProps } from '../types';

import { useStore } from './store';

interface IProps extends IMapProps {
    map: HTMLImageElement;
}

const MapComponent = ({ map, zIndex, screenSize }: IProps) => {
    const { zoom: commonZoom, position: commonPosition } = useMapMovementParamsStore().store;
    const { position: imageMapPosition, zoom: imageMapZoom } = useStore().store;

    const position = vectorSum(commonPosition, imageMapPosition);
    const zoom = commonZoom * imageMapZoom;
    const zoomedImageSize = vectorMult(getVector(map.width, map.height), zoom);

    return (
        <MapWrapper
            screenSize={screenSize}
            zIndex={zIndex}
        >
            {(ctx) => ctx.drawImage(map, position.x, position.y, zoomedImageSize.x, zoomedImageSize.y)}
        </MapWrapper>
    );
};

// eslint-disable-next-line import/no-unused-modules
export function Map(props: IMapProps) {
    const { map } = useStore().store;

    if (!map) {
        return null;
    }

    return (
        <MapComponent
            key={map.src}
            {...props}
            map={map}
        />
    );
}
