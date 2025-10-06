import './styles.css';

import { Canvas } from 'components/canvas/Canvas';
import { Hex } from 'components/canvas/Hex';
import { useMouseMove } from 'hooks/useMouseMove';
import { IPoint } from 'types';
import { getVector, vectorSub, vectorSum } from 'utils';

import { useMapMovementParamsStore } from '../../mapMovingStore';
import { IMapProps } from '../../types';
import { HEX_CONFIG } from '../hexConfig';
import { useBrushStore } from '../stores/brushStore';
import { useGridStore } from '../stores/gridSwitchStore';
import { useHexMapStore } from '../stores/hexMapStore';
import { HexMapData } from '../types';
import { getHexHeight, getHexRadius } from '../utils';

import { fillHex } from './utils';

// TODO: Ctrl+Z for painting

type Props = IMapProps & {
    data: HexMapData;
};

function HexMapComponent({ isEditable, zIndex, data, screenSize }: Props) {
    const { zoom, position: commonPosition } = useMapMovementParamsStore().store;
    const {
        store: { hexWidth: originalHexWidth, opacity, position: hexMapPosiition },
        setStore: setHexMap,
    } = useHexMapStore();
    const { brush } = useBrushStore().store;
    const { isGridTurnedOn } = useGridStore().store;

    const position = vectorSum(commonPosition, hexMapPosiition);
    const hexWidth = originalHexWidth * zoom;
    const hexRadius = getHexRadius(hexWidth);
    const hexHeight = getHexHeight(hexRadius);
    const mapSize = getVector(data.width, data.height);

    const updateMapCell = (point: IPoint) => {
        const newData = fillHex({
            point,
            hexWidth,
            hexRadius,
            mapSize,
            brush,
            data: data.data,
        });
        setHexMap({ data: new HexMapData([...newData]) });
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

                for (let y = 0; y < data.height; y += 1) {
                    if (y * hexHeight + position.y > screenSize.y) {
                        break;
                    }

                    const row = data.data[y];

                    for (let x = 0; x < row.length; x += 1) {
                        if (x * hexWidth + position.x > screenSize.x) {
                            break;
                        }

                        const hexType = row[x];

                        Hex({
                            ctx,
                            position: { x, y },
                            offset: position,
                            width: hexWidth,
                            radius: hexRadius,
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
    const { isVisible, data } = useHexMapStore().store;

    if (!isVisible || !data || !data.height) {
        return null;
    }

    return (
        <HexMapComponent
            {...props}
            data={data}
        />
    );
}
