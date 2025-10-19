import { Hex } from 'components/canvas/Hex';
import { EMPTY_COLOR, WATER_COLOR } from 'const';
import { getHexHeight } from 'hexUtils';
import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { MapWrapper } from 'screens/EditorScreen/components/MapWrapper';
import { IPoint } from 'types';
import { vectorSum } from 'utils';

import { HexMapStore } from '../hex/store';
import { useGridStore } from '../hex/stores/gridSwitchStore';
import { HexMapData } from '../models';
import { IMapProps } from '../types';

import { useStore } from './store';

// TODO: Ctrl+Z for painting

type Props = IMapProps & {
    map: HexMapData;
    zoom: number;
    position: IPoint;
    opacity: number;
    onUpdate: (store: Partial<HexMapStore>) => void;
};
// TODO: use isEditable and onUpdate for water level change
function MapComponent({ isEditable: _1, zIndex, map, screenSize, zoom, position, opacity, onUpdate: _2 }: Props) {
    const { isGridTurnedOn } = useGridStore().store;

    const zoomedHexWidth = HexMapData.hexWidth * zoom;
    const zoomedHexHeight = getHexHeight(zoomedHexWidth);

    return (
        <MapWrapper
            screenSize={screenSize}
            zIndex={zIndex}
            opacity={opacity}
        >
            {(ctx) => {
                for (let y = 0; y < map.columnLength; y += 1) {
                    if (y * zoomedHexHeight + position.y > screenSize.y) {
                        break;
                    }

                    const row = map.data[y];

                    for (let x = 0; x < row.length; x += 1) {
                        if (x * zoomedHexWidth + position.x > screenSize.x) {
                            break;
                        }

                        const isWaterExist = row[x];

                        Hex({
                            ctx,
                            position: { x, y },
                            offset: position,
                            width: zoomedHexWidth,
                            color: isWaterExist ? WATER_COLOR : EMPTY_COLOR,
                            isGridTurnedOn,
                        });
                    }
                }
            }}
        </MapWrapper>
    );
}

function MovingMap({ zoom, position, ...props }: Props) {
    const { zoom: commonZoom, position: commonPosition } = useMapMovementParamsStore().store;

    return (
        <MapComponent
            {...props}
            zoom={commonZoom * zoom}
            position={vectorSum(commonPosition, position)}
        />
    );
}

// eslint-disable-next-line import/no-unused-modules
export function Map(props: IMapProps) {
    const {
        store: { isVisible, map, opacity, position, zoom },
        setStore,
    } = useStore();

    if (!isVisible || !map) {
        return null;
    }

    return (
        <MovingMap
            {...props}
            map={map}
            zoom={zoom}
            position={position}
            opacity={opacity}
            onUpdate={setStore}
        />
    );
}
