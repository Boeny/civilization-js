import './styles.css';

import { Hex } from 'components/canvas/Hex';
import { useMapMovementParamsStore } from 'hooks/useMapMoving/mapMovingStore';
import { useMouseMove } from 'hooks/useMouseMove';
import { MapWrapper } from 'screens/EditorScreen/components/MapWrapper';
import { IPoint } from 'types';
import { getVector, vectorSub, vectorSum } from 'utils';

import { IMapProps } from '../../types';
import { BRUSH_MAP } from '../config';
import { HexMapData } from '../models';
import { useBrushStore } from '../stores/brushStore';
import { useGridStore } from '../stores/gridSwitchStore';
import { useHexMapStore } from '../stores/hexMapStore';
import { getHexHeight } from '../utils';

import { fillHex } from './utils';

// TODO: Ctrl+Z for painting

type Props = IMapProps & {
    map: HexMapData;
};

function MapComponent({ isEditable, zIndex, map, screenSize }: Props) {
    const { zoom: commonZoom, position: commonPosition } = useMapMovementParamsStore().store;
    const {
        store: { opacity, position: hexMapPosiition, zoom: hexMapZoom },
        setStore: setHexMap,
    } = useHexMapStore();
    const { brush } = useBrushStore().store;
    const { isGridTurnedOn } = useGridStore().store;

    const position = vectorSum(commonPosition, hexMapPosiition);
    const zoom = commonZoom * hexMapZoom;
    const zoomedHexWidth = HexMapData.hexWidth * zoom;
    const zoomedHexHeight = getHexHeight(zoomedHexWidth);

    const updateMapCell = (point: IPoint) => {
        fillHex({
            point,
            hexWidth: zoomedHexWidth,
            brush,
            map,
        });
        setHexMap({ map });
    };

    const { startMoving } = useMouseMove((e) => updateMapCell(vectorSub(getVector(e.offsetX, e.offsetY), position)), isEditable);

    const handleMouseDown = (ctx: CanvasRenderingContext2D, point: IPoint) => {
        if (brush !== null) {
            startMoving();
            updateMapCell(vectorSub(point, position));
        }
    };

    return (
        <MapWrapper
            id="hex-map"
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

export function Map(props: IMapProps) {
    const { isVisible, map } = useHexMapStore().store;

    if (!isVisible || !map || !map.columnLength) {
        return null;
    }

    return (
        <MapComponent
            {...props}
            map={map}
        />
    );
}
