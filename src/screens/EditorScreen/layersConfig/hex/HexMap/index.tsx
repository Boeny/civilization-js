import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { useMouseMove } from 'hooks/useMouseMove';
import { IPoint } from 'types';
import { getVector, vectorSub, vectorSum } from 'utils';

import { useMapMovementParamsStore } from '../../mapMovingStore';
import { IMapProps } from '../../types';
import { HEX_CONFIG } from '../hexConfig';
import { HexMapData } from '../models';
import { useBrushStore } from '../stores/brushStore';
import { useGridStore } from '../stores/gridSwitchStore';
import { useHexMapStore } from '../stores/hexMapStore';
import { getHexHeight, getHexRadius } from '../utils';

import { fillHex } from './utils';

// TODO: Ctrl+Z for painting

type Props = IMapProps & {
    map: HexMapData;
};

function HexMapComponent({ isEditable, zIndex, map, screenSize }: Props) {
    const { zoom, position: commonPosition } = useMapMovementParamsStore().store;
    const {
        store: { opacity, position: hexMapPosiition },
        setStore: setHexMap,
    } = useHexMapStore();
    const { brush } = useBrushStore().store;
    const { isGridTurnedOn } = useGridStore().store;

    const position = vectorSum(commonPosition, hexMapPosiition);
    const zoomedHexWidth = HexMapData.hexWidth * zoom;
    const zoomedHexRadius = getHexRadius(zoomedHexWidth);
    const zoomedHexHeight = getHexHeight(zoomedHexRadius);

    const updateMapCell = (point: IPoint) => {
        fillHex({
            point,
            hexWidth: zoomedHexWidth,
            hexRadius: zoomedHexRadius,
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
        <Canvas
            id="hex-map"
            width={screenSize.x}
            height={screenSize.y}
            style={{ zIndex, opacity }}
            onMouseDown={isEditable ? handleMouseDown : undefined}
        >
            {(ctx: CanvasRenderingContext2D) => {
                ctx.clearRect(0, 0, screenSize.x, screenSize.y);

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
                            radius: zoomedHexRadius,
                            color: HEX_CONFIG[hexType].color,
                            isGridTurnedOn,
                        });
                    }
                }
            }}
        </Canvas>
    );
}

export function HexMap(props: IMapProps) {
    const { isVisible, map } = useHexMapStore().store;

    if (!isVisible || !map || !map.columnLength) {
        return null;
    }

    return (
        <HexMapComponent
            {...props}
            map={map}
        />
    );
}
