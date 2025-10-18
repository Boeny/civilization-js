import { Hex } from 'components/canvas/Hex';
import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { useMouseMove } from 'hooks/useMouseMove';
import { MapWrapper } from 'screens/EditorScreen/components/MapWrapper';
import { IPoint } from 'types';
import { getVector, vectorSub, vectorSum } from 'utils';

import { BRUSH_MAP } from '../hex/config';
import { fillHex } from '../hex/Map/utils';
import { HexMapData } from '../hex/models';
import { useGridStore } from '../hex/stores/gridSwitchStore';
import { HexMapStore } from '../hex/stores/hexMapStore';
import { HEX_TYPE } from '../hex/types';
import { getHexHeight } from '../hex/utils';
import { IMapProps } from '../types';

import { useWaterMapStore } from './waterMapStore';

// TODO: Ctrl+Z for painting

type Props = IMapProps & {
    map: HexMapData;
    zoom: number;
    position: IPoint;
    opacity: number;
    onUpdate: (store: Partial<HexMapStore>) => void;
};

function MapComponent({ isEditable, zIndex, map, screenSize, zoom, position, opacity, onUpdate }: Props) {
    const { isGridTurnedOn } = useGridStore().store;

    const zoomedHexWidth = HexMapData.hexWidth * zoom;
    const zoomedHexHeight = getHexHeight(zoomedHexWidth);

    const updateMapCell = (point: IPoint) => {
        fillHex({
            point,
            hexWidth: zoomedHexWidth,
            brush: HEX_TYPE.water,
            map,
        });
        onUpdate({ map });
    };

    const { startMoving } = useMouseMove((e) => updateMapCell(vectorSub(getVector(e.offsetX, e.offsetY), position)), isEditable);

    const handleMouseDown = (ctx: CanvasRenderingContext2D, point: IPoint) => {
        startMoving();
        updateMapCell(vectorSub(point, position));
    };

    return (
        <MapWrapper
            screenSize={screenSize}
            zIndex={zIndex}
            opacity={opacity}
            onMouseDown={isEditable ? handleMouseDown : undefined}
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

                        const hexType = row[x];

                        Hex({
                            ctx,
                            position: { x, y },
                            offset: position,
                            width: zoomedHexWidth,
                            color: BRUSH_MAP[hexType].color,
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
    } = useWaterMapStore();

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
