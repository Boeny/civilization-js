import { Hex } from 'components/canvas/Hex';
import { getHexHeight } from 'hexUtils';
import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { useMouseMove } from 'hooks/useMouseMove';
import { IPoint } from 'types';
import { getVector, vectorSub, vectorSum } from 'utils';

import { BRUSH_MAP } from '../components/HexBrushes/config';
import { useBrushStore } from '../components/HexBrushes/store';
import { MapWrapper } from '../components/MapWrapper';
import { useGridStore } from '../components/ToggleGridButton/store';
import { getMapCoordinatesFromCursor, getMapCellsFromLine } from '../hexUtils';
import { HexMapData } from '../models';
import { IMapProps, HEX_TYPE } from '../types';

import { HexMapStore, useStore } from './store';

function updateCell(mapPoint: IPoint, map: HexMapData, brush: HEX_TYPE) {
    if (
        mapPoint.x < 0 ||
        mapPoint.y < 0 ||
        mapPoint.x >= map.rowLength ||
        mapPoint.y >= map.columnLength ||
        map.data[mapPoint.y][mapPoint.x] === brush
    ) {
        return false;
    }

    map.data[mapPoint.y][mapPoint.x] = brush;

    return true;
}

function updateCells(mapPoints: IPoint[], map: HexMapData, brush: HEX_TYPE) {
    let isCellChanged = false;

    for (const mapPoint of mapPoints) {
        isCellChanged = updateCell(mapPoint, map, brush) || isCellChanged;
    }

    return isCellChanged;
}

function drawPoint(center: IPoint, size: number, map: HexMapData, brush: HEX_TYPE) {
    if (size === 1) {
        return updateCell(center, map, brush);
    }

    return updateCells([center], map, brush);
}

function drawPoints(mapPoints: IPoint[], size: number, map: HexMapData, brush: HEX_TYPE) {
    let isCellChanged = false;

    for (const mapPoint of mapPoints) {
        isCellChanged = drawPoint(mapPoint, size, map, brush) || isCellChanged;
    }

    return isCellChanged;
}

// TODO: Ctrl+Z for painting

let startingCursorPointOnMap: IPoint | null = null;

type Props = IMapProps & {
    map: HexMapData<HEX_TYPE>;
    zoom: number;
    position: IPoint;
    opacity: number;
    onUpdate: (store: Partial<HexMapStore>) => void;
};

function MapComponent({ isEditable, zIndex, map, screenSize, zoom, position, opacity, onUpdate }: Props) {
    const { brush, size } = useBrushStore().store;
    const { isGridTurnedOn } = useGridStore().store;

    const zoomedHexWidth = HexMapData.hexWidth * zoom;
    const zoomedHexHeight = getHexHeight(zoomedHexWidth);

    function handleMouseDown(ctx: CanvasRenderingContext2D, currentCursorPoint: IPoint) {
        if (brush === null) {
            return;
        }

        startMoving();

        const currentCursorPointOnMap = vectorSub(currentCursorPoint, position);
        const mapPoint = getMapCoordinatesFromCursor(currentCursorPointOnMap, zoomedHexWidth);

        if (drawPoint(mapPoint, size, map, brush)) {
            onUpdate({ map });
        }

        startingCursorPointOnMap = currentCursorPointOnMap;
    }

    const { startMoving } = useMouseMove((e) => {
        if (brush === null || !startingCursorPointOnMap) {
            return;
        }

        const currentCursorPoint = getVector(e.offsetX, e.offsetY);
        const currentCursorPointOnMap = vectorSub(currentCursorPoint, position);

        const mapPointsBetween = getMapCellsFromLine(startingCursorPointOnMap, currentCursorPointOnMap, {
            includeStart: false,
            includeEnd: true,
            hexWidth: zoomedHexWidth,
            minDistance: (zoomedHexHeight / 1.5) * size,
        });

        if (drawPoints(mapPointsBetween, size, map, brush)) {
            onUpdate({ map });
        }

        startingCursorPointOnMap = currentCursorPointOnMap;
    }, isEditable);

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
    } = useStore();

    if (!isVisible || !map || !map.columnLength) {
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
