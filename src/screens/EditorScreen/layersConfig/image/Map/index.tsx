import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { MapWrapper } from 'screens/EditorScreen/components/MapWrapper';
import { getVector, vectorMult, vectorSum } from 'utils';

import { IMapProps } from '../../types';
import { useImageMapStore } from '../imageMapStore';

interface IProps extends IMapProps {
    map: HTMLImageElement;
}

const MapComponent = ({ map, zIndex, screenSize }: IProps) => {
    const { zoom: commonZoom, position: commonPosition } = useMapMovementParamsStore().store;
    const { position: imageMapPosition, zoom: imageMapZoom } = useImageMapStore().store;

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
    const { map } = useImageMapStore().store;

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
